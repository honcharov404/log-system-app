# Log System App

A simple fullstack log tracking interface built with **React + Tailwind CSS** and **Node.js/Express**.

## 📁 Structure
```
log-system-app/
├── frontend/        # React + Tailwind client
└── backend/         # Express.js server
```

## 🖥️ Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
> The frontend will run on: `http://localhost:5173`

## 🔌 Backend Setup
```bash
cd backend
npm install
npm start
```
> The backend API runs on: `http://localhost:4000`

## 📋 Features
- Editable logs table with pagination
- Responsive & accessible layout
- ARIA & semantic HTML support
- Toasts for feedback, modal for add new log and confirmation

## 🛠 API Endpoints
```
GET    /api/logs         # Fetch all logs
POST   /api/logs         # Create new log
PUT    /api/logs/:id     # Update log by ID
DELETE /api/logs/:id     # Delete log by ID
```

## 🌍 Deployed URL
`https://log-system-app.vercel.app/`

---
**⚠️ Note**: This demo uses in-memory logs and is not persistent.