# NIRVAH — AI-Powered Government Document Analysis

> **Live Link:** Coming Soon 🚀

NIRVAH is an AI-assisted document analysis application designed to process government PDF documents, extract useful information, and generate structured Excel reports. The goal is to reduce manual document review and make extracted information easier to organize and analyze.

## ✨ Features

- **PDF upload:** Upload PDF documents through the web interface.
- **AI-powered analysis:** Uses the Ollama model `llama3.2:3b` to analyze document content.
- **Document processing:** Processes uploaded PDFs through the Python backend.
- **Excel report generation:** Converts processed information into a downloadable Excel workbook.
- **Web interface:** Angular frontend for interacting with the application.
- **API backend:** FastAPI endpoints connect the frontend to document processing and AI functionality.

> **Current status:** The application is under development. The public deployment link will be added when hosting is complete. Persistent company records and an Excel Reports history page are planned for a future update.

## 🧰 Technology Stack

| Component | Technology |
|---|---|
| Frontend | Angular, TypeScript, HTML, SCSS |
| Backend | Python, FastAPI |
| AI model runtime | Ollama |
| AI model | `llama3.2:3b` |
| Containerization | Docker and Docker Compose (setup in progress) |

## 🏗️ How NIRVAH Works

1. The user opens the Angular web interface.
2. The user selects one or more PDF documents.
3. The frontend sends the files to the FastAPI backend.
4. The backend extracts and processes document content.
5. The backend uses the configured Ollama model to analyze the content.
6. The processed information is organized into an Excel workbook.
7. The workbook is returned to the frontend for download.

```text
User
 |
 v
Angular Frontend
 |
 | Upload PDF files
 v
FastAPI Backend
 |
 v
PDF Extraction and Processing
 |
 v
Ollama (llama3.2:3b)
 |
 v
Structured Results
 |
 v
Excel Workbook
 |
 v
Download Report
```

## 📁 Project Structure

The project is organized into frontend and backend folders. Your exact files may vary as development continues.

```text
GovDocAI/
├── frontend/                 # Angular application
│   └── src/
│       └── app/
│           ├── pages/
│           │   ├── dashboard/
│           │   ├── process-documents/
│           │   └── company-records/
│           └── nirvah-api.service.ts
├── backend/                  # FastAPI application
│   ├── main.py
│   ├── requirements.txt
│   ├── uploads/              # Uploaded PDFs (keep private; do not commit)
│   └── storage/              # Local storage area (persistence planned)
├── .gitignore
└── README.md
```

## ✅ Prerequisites

For local development, install:

- Python 3
- Node.js and npm
- Ollama
- The Ollama model `llama3.2:3b`
- Git
- Docker Desktop and Docker Compose (for containerization)

## 🚀 Run Locally

### 1. Clone the repository

Replace `YOUR_GITHUB_REPOSITORY_URL` with your GitHub repository URL.

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
cd GovDocAI
```

### 2. Start Ollama

Install and start Ollama, then download the model:

```bash
ollama pull llama3.2:3b
```

Make sure Ollama is running and the model is available before testing AI processing.

### 3. Start the backend

Open a terminal in the backend directory:

```powershell
cd backend
python -m venv venv
```

Activate the virtual environment on Windows PowerShell:

```powershell
.\venv\Scripts\Activate.ps1
```

Install the backend dependencies:

```powershell
pip install -r requirements.txt
```

Start FastAPI:

```powershell
python -m uvicorn main:app --reload
```

The API should be available at:

- API: `http://127.0.0.1:8000`
- Interactive API documentation: `http://127.0.0.1:8000/docs`

### 4. Start the frontend

Open a second terminal:

```powershell
cd frontend
npm install
npm start
```

If `npm start` is not configured in `package.json`, use the script provided by the project, commonly:

```powershell
npx ng serve
```

Open `http://localhost:4200` in your browser.

### 5. Process documents

1. Open the NIRVAH website locally.
2. Navigate to **Process Documents**.
3. Select or drop PDF files into the upload area.
4. Start processing.
5. Wait for the AI analysis and Excel generation to finish.
6. Download the generated Excel report.

The backend and Ollama must remain running while processing documents locally.

## 🔌 Backend API

The current backend includes the following endpoints:

| Method | Endpoint | Purpose |
|---|---|---|
| `GET` | `/` | Root endpoint |
| `GET` | `/health` | Health check |
| `POST` | `/upload` | Upload documents |
| `POST` | `/analyze` | Analyze a document |
| `POST` | `/process-documents` | Process documents |
| `POST` | `/consolidate` | Consolidate extracted records |
| `POST` | `/export-excel` | Export data to Excel |
| `POST` | `/process-and-export` | Process uploaded PDFs and return an Excel report |

Check `http://127.0.0.1:8000/docs` while the backend is running for exact request formats and responses.

## 🐳 Docker and Deployment

Docker is being configured to package and run NIRVAH consistently. The intended deployment includes the Angular frontend, FastAPI backend, and Ollama AI model or a compatible remote inference service.

**Docker alone does not host the application publicly.** Public deployment also requires a cloud host with enough resources for the backend and AI model. Free hosting limits may affect memory, processing time, availability, and whether services sleep when idle.

- **Live Link:** Coming Soon 🚀
- **Deployment status:** In progress

## 🔒 Privacy and Security

- Do not commit `.env` files, passwords, API keys, or other secrets.
- Do not commit private or sensitive government PDFs.
- Keep uploaded files and generated data out of public repositories.
- Configure production CORS, authentication, file-size limits, and secure storage before public deployment.
- Only upload documents you are authorized to process.
- Review the hosting provider's privacy and retention policies before uploading sensitive documents.

## 🛣️ Planned Improvements

- Public deployment of the complete application
- Persistent company records
- Excel Reports page and report history
- Further deployment and reliability improvements

## 🤝 Contributing

Suggestions and feedback are welcome. For code contributions:

1. Fork the repository.
2. Create a feature branch.
3. Make and test your changes.
4. Open a pull request describing the update.

## 📄 License

No license has been specified yet. Unless a license is added to this repository, reuse and redistribution are not automatically granted.

---

**NIRVAH — turning document processing into structured, actionable data.**
