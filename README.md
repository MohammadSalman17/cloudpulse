# CloudPulse — Next-Generation FinOps & Cloud Intelligence Platform

<p align="center">
  <strong>Enterprise FinOps dashboard</strong> with 3D Earth visualization, real-time Kafka telemetry, multi-cloud CSV ingestion, interactive analytics, carbon intelligence, and AI-powered cost & anomaly remediation.
</p>

---

## ✨ Features

- **3D Interactive Globe** — Orthographic Earth view highlighting cloud regions and live activity
- **Real-time Streaming** — Kafka → WebSocket bridge for live metric feeds
- **Flexible CSV Ingestion** — Upload or stream multi-cloud billing & telemetry CSVs
- **Multi-Cloud Support** — AWS, Azure, GCP (cost, health, carbon metrics)
- **Carbon Intelligence** — CO₂e emissions, carbon intensity, carbon-free energy %
- **AI Agents** — Gemini / Groq powered cost optimization & autonomous anomaly remediation
- **Live Dashboard Tabs** — Overview · Cost · Health · Carbon · Live Feed · AI Agent
- **Anomaly Detection & Remediation** — Real-time graphs + PDF remediation reports

---

## 📂 Project Structure

```
cloudpulse/
├── data/
│   ├── demo.csv                              # Small demo billing dataset (~50 users)
│   └── cloud_metrics_training_sample.csv     # Realistic multi-cloud metrics sample
├── public/                                   # Static assets
├── scripts/                                  # Kafka produce & test scripts
├── server/                                   # Kafka → WebSocket bridge
├── src/                                      # React frontend (components, hooks, lib, tabs)
├── server.ts                                 # Express + Vite dev server
├── package.json
├── .env.example
└── README.md
```

---

## 🚀 Quick Start

### 1. Clone & Install

```bash
git clone https://github.com/MohammadSalman17/cloudpulse.git
cd cloudpulse
npm install
```

### 2. Environment

```bash
cp .env.example .env.local
```

### 3. Run

```bash
npm run dev
```

Open http://localhost:3000

### Optional Kafka live stream

```bash
# Terminal 1
npm run dev

# Terminal 2
npm run bridge

# Terminal 3
npm run produce:demo
```

---

## 📊 Datasets

| File | Description |
|------|-------------|
| `data/demo.csv` | Simple billing demo (user, cost, anomaly flags) |
| `data/cloud_metrics_training_sample.csv` | Real-style multi-cloud metrics (AWS / Azure / GCP) for **cost**, **health**, and **carbon** |

**Training sample schema**
```
user_id, account_id, event_date, provider, region, service,
category, metric_name, metric_value, unit, currency, data_source
```

Categories: `cost` | `health` | `carbon`  
Providers: AWS · Azure · GCP

A larger ~270k-row training dataset is available for model training if needed.

---

## 🛠️ Tech Stack

React 19 · Vite · TypeScript · Tailwind CSS 4 · react-globe.gl · Recharts · KafkaJS · Express · Google Gemini · Groq · jsPDF

---

## 🔑 Environment Variables

See `.env.example` for Kafka, Gemini, and Groq configuration.

---

## License

MIT
