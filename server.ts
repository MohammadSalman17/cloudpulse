import express, { Request, Response } from 'express';
import path from 'path';
import fs from 'fs';
import dotenv from 'dotenv';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import { fileURLToPath } from 'url';

dotenv.config({ path: '.env.local' });
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const isProd = process.env.NODE_ENV === 'production';
const PORT = Number(process.env.PORT) || 3000;

async function createApp() {
  const app = express();
  app.use(express.json({ limit: '10mb' }));

  // Health
  app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok', service: 'cloudpulse', timestamp: new Date().toISOString() });
  });

  // Simple Gemini proxy (example)
  app.post('/api/ai/analyze', async (req: Request, res: Response) => {
    try {
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        return res.status(500).json({ error: 'GEMINI_API_KEY not configured' });
      }
      const ai = new GoogleGenAI({ apiKey });
      const prompt = req.body?.prompt || 'Summarize cloud cost anomalies';
      const response = await ai.models.generateContent({
        model: process.env.GOOGLE_AI_MODEL || 'gemini-2.5-flash',
        contents: prompt,
      });
      res.json({ text: response.text || '' });
    } catch (err: any) {
      console.error(err);
      res.status(500).json({ error: err?.message || 'AI request failed' });
    }
  });

  if (!isProd) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'custom',
    });
    app.use(vite.middlewares);
    app.use('*', async (req, res, next) => {
      try {
        const url = req.originalUrl;
        let template = fs.readFileSync(path.resolve(__dirname, 'index.html'), 'utf-8');
        template = await vite.transformIndexHtml(url, template);
        res.status(200).set({ 'Content-Type': 'text/html' }).end(template);
      } catch (e) {
        vite.ssrFixStacktrace(e as Error);
        next(e);
      }
    });
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist/index.html'));
    });
  }

  app.listen(PORT, () => {
    console.log(`CloudPulse server running on http://localhost:${PORT}`);
  });
}

createApp().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
