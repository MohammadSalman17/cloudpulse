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
│   ├── demo.csv                              # Small demo billing dataset (50 users)
│   └── cloud_metrics_training_sample_1k.csv  # Realistic multi-cloud metrics sample (~1k rows)
├── public/                                   # Static assets
├── scripts/
│   ├── produceCSV.ts                         # Stream CSV rows to Kafka
│   └── testKafka.ts                          # Kafka connectivity test
├── server/
│   └── kafkaBridge.ts                        # Kafka → WebSocket bridge
├── src/
│   ├── components/                           # UI components (Globe, tables, modals, tabs…)
│   ├── context/                              # Auth context
│   ├── hooks/                                # useLiveMetrics, useKafkaStream
│   ├── lib/                                  # CSV parser, Kafka client, AI agents, region data
│   ├── App.tsx
│   ├── main.tsx
│   ├── types.ts
│   └── index.css
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
# or: bun install
```

### 2. Environment

```bash
cp .env.example .env.local
```

Edit `.env.local` with your keys (see below).

### 3. Run the App

```bash
npm run dev
```

Open **http://localhost:3000**

### 4. (Optional) Kafka Live Stream

**Terminal 1** – Dashboard  
```bash
npm run dev
```

**Terminal 2** – WebSocket bridge  
```bash
npm run bridge
```

**Terminal 3** – Produce demo data  
```bash
npm run produce:demo
```

---

## 📡 Kafka Setup

### Local Docker (Beginner)

```bash
docker run -d --name cloudpulse-kafka \
  -p 9092:9092 \
  -e KAFKA_CFG_NODE_ID=0 \
  -e KAFKA_CFG_PROCESS_ROLES=controller,broker \
  -e KAFKA_CFG_LISTENERS=PLAINTEXT://:9092,CONTROLLER://:9093 \
  -e KAFKA_CFG_ADVERTISED_LISTENERS=PLAINTEXT://localhost:9092 \
  -e KAFKA_CFG_CONTROLLER_QUORUM_VOTERS=0@localhost:9093 \
  -e KAFKA_CFG_CONTROLLER_LISTENER_NAMES=CONTROLLER \
  bitnami/kafka:latest
```

`.env.local`:
```env
KAFKA_BOOTSTRAP_SERVERS=localhost:9092
KAFKA_TOPIC=cloudpulse-events
KAFKA_USE_SSL=false
```

Test:
```bash
npm run kafka:test
npm run produce:demo
```

### Confluent Cloud (Production)

Set in `.env.local`:
```env
KAFKA_BOOTSTRAP_SERVERS=<your-bootstrap>:9092
KAFKA_API_KEY=...
KAFKA_API_SECRET=...
KAFKA_TOPIC=cloudpulse-events
KAFKA_USE_SSL=true
```

Stream any CSV:
```bash
npm run produce -- --file=data/cloud_metrics_training_sample_1k.csv --delay=500
```

---

## 📊 Included Datasets

| File | Rows | Description |
|------|------|-------------|
| `data/demo.csv` | ~50 | Simple billing demo (user, cost, anomaly flags) |
| `data/cloud_metrics_training_sample_1k.csv` | 1 000 | Real-style multi-cloud metrics (AWS / Azure / GCP) covering **cost**, **health**, and **carbon** categories |

### Schema of the training sample

```
user_id, account_id, event_date, provider, region, service,
category, metric_name, metric_value, unit, currency, data_source
```

**Categories**
- `cost` → `cloud_cost`, `usage_amount`, `usage_hours`
- `health` → `availability`, `error_rate`, `latency`
- `carbon` → `co2e_emissions`, `carbon_intensity`, `carbon_free_energy_pct`

Providers: AWS · Azure · GCP  
Regions: us-east-1, eu-west-1, ap-south-1, europe-west1, asia-south1, East US, Central India, etc.

A full ~270 k-row training dataset is available separately if you need larger model training.

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | React 19 + Vite + TypeScript |
| Styling | Tailwind CSS 4 |
| 3D Globe | react-globe.gl / Three.js |
| Charts | Recharts |
| Real-time | KafkaJS + WebSocket (ws) |
| AI | Google Gemini (`@google/genai`) + Groq |
| Backend | Express + tsx |
| PDF | jsPDF |

---

## 🔑 Environment Variables

```env
# Kafka
KAFKA_BOOTSTRAP_SERVERS=localhost:9092
KAFKA_API_KEY=
KAFKA_API_SECRET=
KAFKA_TOPIC=cloudpulse-events
KAFKA_GROUP_ID=cloudpulse-consumer-group
KAFKA_USE_SSL=false

# Google Gemini
GEMINI_API_KEY=
GOOGLE_AI_MODEL=gemini-2.5-flash

# Groq (anomaly remediation agent)
GROQ_API_KEY=
```

---

## 📜 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Express + Vite development server |
| `npm run build` | Production build |
| `npm start` | Run production server |
| `npm run bridge` | Start Kafka → WebSocket bridge |
| `npm run produce:demo` | Stream `data/demo.csv` to Kafka |
| `npm run produce -- --file=...` | Stream any CSV |
| `npm run kafka:test` | Test Kafka connectivity |
| `npm run lint` | TypeScript check |

---

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

---

## 📄 License

MIT (or update as needed)

---

<p align="center">
  Built for modern FinOps teams · Multi-cloud · Real-time · AI-native
</p>
