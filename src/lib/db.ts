import Database from 'better-sqlite3';
import path from 'node:path';

let db: Database.Database | null = null;

function getDb(): Database.Database {
  if (db) return db;

  const dbPath = import.meta.env.DATABASE_PATH || 'database/filosofisk-forum.db';
  const resolvedPath = path.resolve(dbPath);

  db = new Database(resolvedPath);
  db.pragma('journal_mode = WAL');
  db.pragma('foreign_keys = ON');

  db.exec(`
    CREATE TABLE IF NOT EXISTS subscribers (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE NOT NULL,
      is_member BOOLEAN DEFAULT 0,
      subscribed_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      active BOOLEAN DEFAULT 1
    );

    CREATE TABLE IF NOT EXISTS drafts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      subject TEXT NOT NULL,
      body TEXT NOT NULL,
      recipient_filter TEXT DEFAULT 'all',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);

  return db;
}

// --- Subscribers ---

export interface Subscriber {
  id: number;
  email: string;
  is_member: number;
  subscribed_at: string;
  active: number;
}

export function addSubscriber(email: string): Subscriber {
  const db = getDb();
  const stmt = db.prepare(
    'INSERT INTO subscribers (email) VALUES (?)'
  );
  const result = stmt.run(email.toLowerCase().trim());
  return db.prepare('SELECT * FROM subscribers WHERE id = ?').get(result.lastInsertRowid) as Subscriber;
}

export function getSubscribers(filter?: 'all' | 'members' | 'non-members'): Subscriber[] {
  const db = getDb();
  let query = 'SELECT * FROM subscribers WHERE active = 1';
  if (filter === 'members') query += ' AND is_member = 1';
  else if (filter === 'non-members') query += ' AND is_member = 0';
  query += ' ORDER BY subscribed_at DESC';
  return db.prepare(query).all() as Subscriber[];
}

export function deleteSubscriber(id: number): void {
  const db = getDb();
  db.prepare('UPDATE subscribers SET active = 0 WHERE id = ?').run(id);
}

// --- Drafts ---

export interface Draft {
  id: number;
  subject: string;
  body: string;
  recipient_filter: string;
  created_at: string;
}

export function saveDraft(subject: string, body: string, recipientFilter: string): Draft {
  const db = getDb();
  const stmt = db.prepare(
    'INSERT INTO drafts (subject, body, recipient_filter) VALUES (?, ?, ?)'
  );
  const result = stmt.run(subject, body, recipientFilter);
  return db.prepare('SELECT * FROM drafts WHERE id = ?').get(result.lastInsertRowid) as Draft;
}

export function getDrafts(): Draft[] {
  const db = getDb();
  return db.prepare('SELECT * FROM drafts ORDER BY created_at DESC').all() as Draft[];
}

export function deleteDraft(id: number): void {
  const db = getDb();
  db.prepare('DELETE FROM drafts WHERE id = ?').run(id);
}
