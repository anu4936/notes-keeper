import React, { useState, useEffect } from 'react';
import './App.css';

const API_URL = 'http://localhost:5000/api/notes';

function App() {
  const [notes, setNotes] = useState([]);
  const [form, setForm] = useState({
    title: '',
    content: '',
    color: '#ffeb3b'
  });
  const [editing, setEditing] = useState(null);

  const colors = [
    '#ffeb3b',
    '#ff9800',
    '#f44336',
    '#e91e63',
    '#9c27b0',
    '#673ab7',
    '#3f51b5',
    '#2196f3',
    '#03a9f4',
    '#00bcd4',
    '#009688',
    '#4caf50'
  ];

  useEffect(() => {
    fetchNotes();
  }, []);

  // Fetch all notes
  const fetchNotes = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setNotes(data);
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };

  // Add or Update Note
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const url = editing ? `${API_URL}/${editing}` : API_URL;
      const method = editing ? 'PUT' : 'POST';

      await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(form)
      });

      setForm({
        title: '',
        content: '',
        color: '#ffeb3b'
      });

      setEditing(null);
      fetchNotes();
    } catch (error) {
      console.error("Error saving note:", error);
    }
  };

  // Edit Note
  const handleEdit = (note) => {
    setForm({
      title: note.title,
      content: note.content,
      color: note.color
    });

    setEditing(note.id);
  };

  // Delete Note
  const handleDelete = async (id) => {
    try {
      await fetch(`${API_URL}/${id}`, {
        method: 'DELETE'
      });

      fetchNotes();
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  return (
    <div className="App">
      <header>
        <h1>📝 Notes Keeper</h1>
      </header>

      <form
        className="note-form"
        onSubmit={handleSubmit}
        style={{ backgroundColor: form.color }}
      >
        <input
          type="text"
          placeholder="Title"
          value={form.title}
          onChange={(e) =>
            setForm({ ...form, title: e.target.value })
          }
          required
        />

        <textarea
          placeholder="Take a note..."
          value={form.content}
          onChange={(e) =>
            setForm({ ...form, content: e.target.value })
          }
          required
        />

        <div className="form-actions">
          <div className="color-picker">
            {colors.map((color) => (
              <div
                key={color}
                className={`color-option ${
                  form.color === color ? 'selected' : ''
                }`}
                style={{ backgroundColor: color }}
                onClick={() =>
                  setForm({ ...form, color: color })
                }
              ></div>
            ))}
          </div>

          <div className="buttons">
            <button type="submit">
              {editing ? 'Update Note' : 'Add Note'}
            </button>

            {editing && (
              <button
                type="button"
                onClick={() => {
                  setEditing(null);
                  setForm({
                    title: '',
                    content: '',
                    color: '#ffeb3b'
                  });
                }}
              >
                Cancel
              </button>
            )}
          </div>
        </div>
      </form>

      <div className="notes-grid">
        {notes.length === 0 ? (
          <p>No notes available.</p>
        ) : (
          notes.map((note) => (
            <div
              key={note.id}
              className="note-card"
              style={{ backgroundColor: note.color }}
            >
              <h3>{note.title}</h3>

              <p>{note.content}</p>

              <div className="note-actions">
                <button onClick={() => handleEdit(note)}>
                  ✏️
                </button>

                <button onClick={() => handleDelete(note.id)}>
                  🗑️
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default App;
