const sqlite3 = require("sqlite3");
const { open } = require("sqlite");

async function connectDB() {
    const db = await open({
        filename: "./users.db",
        driver: sqlite3.Database
    });

    await db.exec(`
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT UNIQUE NOT NULL,
            name TEXT NOT NULL,
            password TEXT NOT NULL
        );
    `);

    console.log("Database connected successfully");

    return db;
}

module.exports = connectDB;