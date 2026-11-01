const express = require('express');
const dbPromise = require('./database');

const app = express();

app.use(express.json());

const PORT = 3000;

// Initialize database and start server
const initializeDBAndServer = async () => {
    try {
        const db = await dbPromise;

        console.log('Database connected successfully');

        // 1. GET all books
        app.get('/books/', async (req, res) => {
            try {
                const books = await db.all('SELECT * FROM book');
                res.status(200).send(books);
            } catch (error) {
                res.status(500).send('Internal Server Error');
            }
        });

        // 2. GET a single book
        app.get('/books/:bookId/', async (req, res) => {
            try {
                const { bookId } = req.params;

                const book = await db.get(
                    'SELECT * FROM book WHERE id = ?',
                    [bookId]
                );

                if (!book) {
                    return res.status(404).send('Book Not Found');
                }

                res.status(200).send(book);
            } catch (error) {
                res.status(500).send('Internal Server Error');
            }
        });

        // 3. POST - Add a new book
        app.post('/books/', async (req, res) => {
            try {
                const { title, author, price, pages } = req.body;

                const result = await db.run(
                    `INSERT INTO book (title, author, price, pages)
                     VALUES (?, ?, ?, ?)`,
                    [title, author, price, pages]
                );

                res.status(201).send({
                    message: 'Book Added Successfully',
                    bookId: result.lastID
                });
            } catch (error) {
                res.status(500).send('Internal Server Error');
            }
        });

        // 4. PUT - Update a book
        app.put('/books/:bookId/', async (req, res) => {
            try {
                const { bookId } = req.params;
                const { title, author, price, pages } = req.body;

                const result = await db.run(
                    `UPDATE book
                     SET title = ?, author = ?, price = ?, pages = ?
                     WHERE id = ?`,
                    [title, author, price, pages, bookId]
                );

                if (result.changes === 0) {
                    return res.status(404).send('Book Not Found');
                }

                res.status(200).send('Book Updated Successfully');
            } catch (error) {
                res.status(500).send('Internal Server Error');
            }
        });

        // 5. DELETE - Remove a book
        app.delete('/books/:bookId/', async (req, res) => {
            try {
                const { bookId } = req.params;

                const result = await db.run(
                    'DELETE FROM book WHERE id = ?',
                    [bookId]
                );

                if (result.changes === 0) {
                    return res.status(404).send('Book Not Found');
                }

                res.status(200).send('Book Deleted Successfully');
            } catch (error) {
                res.status(500).send('Internal Server Error');
            }
        });

        // Handle unknown routes
        app.use((req, res) => {
            res.status(404).send('Route Not Found');
        });

        // Start server only after database connection
        app.listen(PORT, () => {
            console.log(`Server running at http://localhost:${PORT}/`);
        });

    } catch (error) {
        console.error('Database connection failed:', error.message);
        process.exit(1);
    }
};

initializeDBAndServer();