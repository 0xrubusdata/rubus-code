# Rubus-Code

# ![0xRubusSage](./public/agents/0xRubusSage.png)

## 🚀 Overview
Rubus-Code is an AI-powered development assistant that understands and integrates seamlessly with your existing codebase.  
It helps developers focus on **design and high-level decision-making**, while automating repetitive coding tasks.

## 📌 Features (WIP)
- **AI Model Selection**: Choose between local (`Ollama`) or external APIs (`OpenAI`, `DeepSeek`, etc.).
- **Project Indexing**: Load and analyze your codebase for better AI-driven assistance.
- **Context-Aware AI Coding**: Generate code that respects your architecture, components, and style guide.
- **Automated Git Workflow**: AI-assisted commit generation and PR creation.

## 📂 Project Structure Backend
```
rubus-code/backend/
├── docker-compose.yml     # Service orchestration
├── .env                   # Environment variables
├── package.json           # Node.js dependencies
├── src/                   # Main application code
│   ├── main.ts            # App bootstrap
│   ├── config/            # Configuration management
│   ├── services/          # AI and validation services
│   │   ├── llm.service.ts # Handles AI model communication
│   │   ├── validation.service.ts # Model validation logic
│   ├── controllers/       # API endpoints
│   │   ├── model.controller.ts  # Model selection and testing
│   ├── modules/           # NestJS modules
│   │   ├── llm.module.ts  # LLM module integration
```

## 🛠️ Installation
### 1️⃣ Clone the repository
```bash
git clone https://github.com/0xrubusdata/rubus-code.git
cd rubus-code
```

### 2️⃣ Start the application
```bash
npm start
```
This will initiate an **interactive CLI setup** before starting the application.

### 3️⃣ Interactive CLI Setup
The CLI will guide you through the configuration process:
- Set **backend, frontend, and database ports**.
- Configure **PostgreSQL credentials** (`POSTGRES_USER`, `POSTGRES_PASSWORD`, etc.).
- Choose **AI model type**:
  - **Local model (Ollama)**: Select from available models.
  - **Remote AI model**: Choose from OpenAI, DeepSeek, etc.
    - Provide an **API key**.
    - The system will **validate** the API key by making a test request.
- Configure **Vector Database Type** (`faiss` or `chromadb`).
- All settings default to `.env` values if no input is provided.

### 4️⃣ Configuration Persistence
- Once setup is complete, settings are saved in `.env.override`.
- To reset settings, delete the override file:
```bash
rm .env.override
```

## 🔍 Usage
### Check AI model connection
```bash
curl http://localhost:3000/api/test-model
```

## 🏗️ Roadmap
- [ ] **Implement AI model selection & validation** ✅ *(Done)*
- [ ] **Load and index a project for AI awareness** ✅ *(In Progress)*
- [ ] **Enable AI-driven development suggestions** *(Next Step)*

## 📜 License
MIT License - Free to use and contribute!

## 📝 **Author**
- 👤 0xRubusData 
- 📧 Contact: 0xRubusData@gmail.com
- 🌍 GitHub: https://github.com/0xrubusdata/rubus-code

## 🌐 Connect with Us
- **Twitter (X)**: [0xRubusData](https://x.com/Data0x88850)
- **Website**: [RubusLab](https://rubus-lab.vercel.app/)

## 🤝 Contributing
Contributions are welcome! Open an issue or submit a PR.

---
🚀 **Stay tuned for updates as Rubus-Code evolves!**
