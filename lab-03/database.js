const sqlite3 = require("sqlite3").verbose();
const path = require("path");

const db = new sqlite3.Database(
    path.join(__dirname, "books.db"),
    (err) => {
        if (err) {
            console.error("Database connection failed:", err.message);
        } else {
            console.log("Connected to SQLite database");
        }
    }
);

db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS book (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            author TEXT NOT NULL,
            price INTEGER NOT NULL,
            pages INTEGER NOT NULL
        )
    `);

    db.get("SELECT COUNT(*) AS count FROM book", (err, row) => {
        if (err) {
            console.error(err.message);
            return;
        }

        if (row.count === 0) {
            const books = [
                ["Web Development", "David Miller", 600, 350],
                ["Database Systems", "Raghu Ramakrishnan", 700, 400],
                ["Data Structures", "Mark Allen", 500, 320],
                ["Machine Learning", "Tom Mitchell", 800, 450],
                ["Artificial Intelligence", "Stuart Russell", 900, 500],
                ["Computer Networks", "Andrew Tanenbaum", 650, 380],
                ["Operating Systems", "Abraham Silberschatz", 750, 420],
                ["C Programming", "Dennis Ritchie", 400, 280],
                ["Full Stack Development", "Sahithya", 650, 350],
                ["Python Programming", "John Smith", 550, 300]
            ];

            const stmt = db.prepare(
                "INSERT INTO book (title, author, price, pages) VALUES (?, ?, ?, ?)"
            );

            books.forEach((book) => {
                stmt.run(book);
            });

            stmt.finalize();

            console.log("Sample books inserted successfully");
        }
    });
});

module.exports = db;