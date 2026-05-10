import * as SQLite from 'expo-sqlite';

export type Note = {
  id: string;
  title: string;
  category: string;
  content: string;
  created_at: string;
};

const db = SQLite.openDatabaseSync('notes.db');

// initiallize database table
export async function initDatabase() {
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS notes (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      category TEXT NOT NULL,
      content TEXT,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP
    );
  `);
}

// get all notes
export async function getAllNotes(): Promise<Note[]> {
  return await db.getAllAsync<Note>('SELECT * FROM notes ORDER BY created_at DESC');
}

// add a new note
export async function addNote(title: string, category: string, content: string = ''): Promise<void> {
  const id = Date.now().toString();
  await db.runAsync(
    'INSERT INTO notes (id, title, category, content) VALUES (?, ?, ?, ?)',
    [id, title, category, content]
  );
}

// Delete a note
export async function deleteNote(id: string): Promise<void> {
  await db.runAsync('DELETE FROM notes WHERE id = ?', [id]);
}

// get single note by id
export async function getNoteById(id: string): Promise<Note | null> {
  const result = await db.getFirstAsync<Note>('SELECT * FROM notes WHERE id = ?', [id]);
  return result || null;
}

// Update note
export async function updateNote(id: string, title: string, category: string, content: string): Promise<void> {
  await db.runAsync(
    'UPDATE notes SET title = ?, category = ?, content = ? WHERE id = ?',
    [title, category, content, id]
  );
}