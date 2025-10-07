const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'notes_db'
});

// GET all notes
app.get('/api/notes', (req, res) => {
  db.query('SELECT * FROM notes ORDER BY created_at DESC', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// POST new note
app.post('/api/notes', (req, res) => {
  const { title, content, color } = req.body;
  db.query('INSERT INTO notes (title, content, color) VALUES (?, ?, ?)', 
    [title, content, color], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ id: result.insertId, title, content, color });
  });
});

// PUT update note
app.put('/api/notes/:id', (req, res) => {
  const { title, content, color } = req.body;
  db.query('UPDATE notes SET title = ?, content = ?, color = ? WHERE id = ?',
    [title, content, color, req.params.id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Note updated' });
  });
});

// DELETE note
app.delete('/api/notes/:id', (req, res) => {
  db.query('DELETE FROM notes WHERE id = ?', [req.params.id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Note deleted' });
  });
});

app.listen(5002, () => console.log('Server running on port 5002'));