# 📝 Notes Keeper

A modern, Google Keep-inspired notes application with colorful notes, responsive design, and full CRUD functionality.

## 🚀 Features

- **📝 Create Notes**: Add notes with title and content
- **✏️ Edit Notes**: Modify existing notes inline
- **🗑️ Delete Notes**: Remove notes with confirmation
- **🎨 Color Coding**: 12 predefined color themes
- **📱 Responsive Design**: Mobile-first approach
- **⚡ Real-time Updates**: Instant UI updates

## 🛠️ Tech Stack

**Frontend:**
- React 19.1.1
- CSS3
- JavaScript ES6+

**Backend:**
- Node.js
- Express.js
- MySQL

**Development:**
- Nodemon
- Concurrently

## 📋 Prerequisites

- Node.js (v14 or higher)
- MySQL Server
- npm or yarn

## ⚡ Quick Start

### 1. Clone the repository
```bash
git clone <repository-url>
cd notes-keeper
```

### 2. Database Setup
```sql
-- Run in MySQL
CREATE DATABASE notes_db;
USE notes_db;

CREATE TABLE notes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  color VARCHAR(20) DEFAULT '#ffffff',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 3. Install Dependencies
```bash
# Install root dependencies
npm install

# Install backend dependencies
cd backend && npm install

# Install frontend dependencies
cd ../frontend && npm install
```

### 4. Configure Database
Update database credentials in `backend/server.js`:
```javascript
const db = mysql.createConnection({
  host: 'localhost',
  user: 'your_username',
  password: 'your_password',
  database: 'notes_db'
});
```

### 5. Run the Application

**Method 1: Run separately (Recommended)**
```bash
# Terminal 1 - Frontend
cd frontend
npm install
npm start

# Terminal 2 - Backend
cd backend
npm install
npm start
```

**Method 2: Run both together**
```bash
# From root directory - runs both frontend and backend
npm run dev
```

## 📡 API Endpoints

### Notes
| Method | Endpoint | Description | Request Body |
|--------|----------|-------------|-------------|
| GET | `/api/notes` | Get all notes | - |
| POST | `/api/notes` | Create new note | `{title, content, color}` |
| PUT | `/api/notes/:id` | Update note | `{title, content, color}` |
| DELETE | `/api/notes/:id` | Delete note | - |

## 🗄️ Database Schema

### Notes Table
```sql
id          INT AUTO_INCREMENT PRIMARY KEY
title       VARCHAR(255) NOT NULL
content     TEXT NOT NULL
color       VARCHAR(20) DEFAULT '#ffffff'
created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP
```

## 🎨 Color Palette

| Color | Hex Code | Usage |
|-------|----------|-------|
| Yellow | `#ffeb3b` | Default |
| Orange | `#ff9800` | Important |
| Red | `#f44336` | Urgent |
| Pink | `#e91e63` | Personal |
| Purple | `#9c27b0` | Creative |
| Deep Purple | `#673ab7` | Ideas |
| Indigo | `#3f51b5` | Work |
| Blue | `#2196f3` | Information |
| Light Blue | `#03a9f4` | Tasks |
| Cyan | `#00bcd4` | Projects |
| Teal | `#009688` | Goals |
| Green | `#4caf50` | Completed |

## 🎯 Usage

### Adding Notes
1. Fill in title and content in the form
2. Select desired color from picker
3. Click "Add Note" to save

### Editing Notes
1. Hover over any note card
2. Click the edit icon (✏️)
3. Modify content and click "Update Note"

### Deleting Notes
1. Hover over any note card
2. Click the delete icon (🗑️)
3. Note is permanently removed

## 📁 Project Structure

```
notes-keeper/
├── backend/
│   ├── server.js          # Express server & API routes
│   ├── database.sql       # Database schema
│   └── package.json       # Backend dependencies
├── frontend/
│   ├── src/
│   │   ├── App.js         # Main React component
│   │   ├── App.css        # Styling
│   │   └── index.js       # React entry point
│   └── package.json       # Frontend dependencies
└── package.json           # Root package with dev scripts
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

