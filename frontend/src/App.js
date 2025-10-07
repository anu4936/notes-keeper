import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [notes, setNotes] = useState([]);
  const [form, setForm] = useState({ title: '', content: '', color: '#ffeb3b' });
  const [editing, setEditing] = useState(null);

  const colors = ['#ffeb3b', '#ff9800', '#f44336', '#e91e63', '#9c27b0', '#673ab7', '#3f51b5', '#2196f3', '#03a9f4', '#00bcd4', '#009688', '#4caf50'];

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    const response = await fetch('http://localhost:5002/api/notes');
    const data = await response.json();
    setNotes(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = editing ? `http://localhost:5002/api/notes/${editing}` : 'http://localhost:5002/api/notes';
    
    await fetch(url, {
      method: editing ? 'PUT' : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    });
    
    setForm({ title: '', content: '', color: '#ffeb3b' });
    setEditing(null);
    fetchNotes();
  };

  const handleEdit = (note) => {
    setForm({ title: note.title, content: note.content, color: note.color });
    setEditing(note.id);
  };

  const handleDelete = async (id) => {
    await fetch(`http://localhost:5002/api/notes/${id}`, { method: 'DELETE' });
    fetchNotes();
  };

  return (
    <div className="App">
      <header>
        <h1>📝 Notes Keeper</h1>
      </header>

      <form onSubmit={handleSubmit} className="note-form" style={{ backgroundColor: form.color }}>
        <input
          type="text"
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({...form, title: e.target.value})}
          required
        />
        <textarea
          placeholder="Take a note..."
          value={form.content}
          onChange={(e) => setForm({...form, content: e.target.value})}
          required
        />
        <div className="form-actions">
          <div className="color-picker">
            {colors.map(color => (
              <div
                key={color}
                className={`color-option ${form.color === color ? 'selected' : ''}`}
                style={{ backgroundColor: color }}
                onClick={() => setForm({...form, color})}
              />
            ))}
          </div>
          <div className="buttons">
            <button type="submit">{editing ? 'Update' : 'Add'} Note</button>
            {editing && (
              <button type="button" onClick={() => {
                setEditing(null);
                setForm({ title: '', content: '', color: '#ffeb3b' });
              }}>Cancel</button>
            )}
          </div>
        </div>
      </form>

      <div className="notes-grid">
        {notes.map(note => (
          <div key={note.id} className="note-card" style={{ backgroundColor: note.color }}>
            <h3>{note.title}</h3>
            <p>{note.content}</p>
            <div className="note-actions">
              <button onClick={() => handleEdit(note)}>✏️</button>
              <button onClick={() => handleDelete(note.id)}>🗑️</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;