const express = require("express");
const db = require("./database");

const app = express();
const PORT = 3000;

app.use(express.json());

// GET: Retrieve all books with search, sorting, filtering and pagination
app.get("/books/", (req, res) => {
    const {
        search_q = "",
        order_by = "id",
        order = "ASC",
        limit = "10",
        offset = "0",
        min_price,
        max_price
    } = req.query;

    // Validate sorting parameters
    const allowedColumns = ["id", "title", "author", "price", "pages"];

    if (!allowedColumns.includes(order_by)) {
        return res.status(400).json({
            message: "Invalid order_by parameter"
        });
    }

    if (!["ASC", "DESC"].includes(order.toUpperCase())) {
        return res.status(400).json({
            message: "Order must be ASC or DESC"
        });
    }

    const pageLimit = Number(limit);
    const pageOffset = Number(offset);

    if (
        !Number.isInteger(pageLimit) ||
        !Number.isInteger(pageOffset) ||
        pageLimit < 1 ||
        pageOffset < 0
    ) {
        return res.status(400).json({
            message: "Limit must be positive and offset must be non-negative"
        });
    }

    if (
        (min_price !== undefined && !Number.isFinite(Number(min_price))) ||
        (max_price !== undefined && !Number.isFinite(Number(max_price)))
    ) {
        return res.status(400).json({
            message: "Price filters must be numeric"
        });
    }

    if (
        min_price !== undefined &&
        max_price !== undefined &&
        Number(min_price) > Number(max_price)
    ) {
        return res.status(400).json({
            message: "min_price cannot be greater than max_price"
        });
    }

    let sql = "SELECT * FROM book WHERE title LIKE ?";
    const params = [`%${search_q}%`];

    if (min_price !== undefined) {
        sql += " AND price >= ?";
        params.push(Number(min_price));
    }

    if (max_price !== undefined) {
        sql += " AND price <= ?";
        params.push(Number(max_price));
    }

    sql += ` ORDER BY ${order_by} ${order.toUpperCase()}`;
    sql += " LIMIT ? OFFSET ?";

    params.push(pageLimit, pageOffset);

    db.all(sql, params, (err, rows) => {
        if (err) {
            return res.status(500).json({
                message: "Unable to retrieve books"
            });
        }

        res.status(200).json(rows);
    });
});


// GET: Retrieve a single book
app.get("/books/:bookId/", (req, res) => {
    const { bookId } = req.params;

    db.get(
        "SELECT * FROM book WHERE id = ?",
        [bookId],
        (err, book) => {
            if (err) {
                return res.status(500).json({
                    message: "Database error"
                });
            }

            if (!book) {
                return res.status(404).json({
                    message: "Book not found"
                });
            }

            res.status(200).json(book);
        }
    );
});


// POST: Add a new book
app.post("/books/", (req, res) => {
    const { title, author, price, pages } = req.body;

    if (
        typeof title !== "string" ||
        !title.trim() ||
        typeof author !== "string" ||
        !author.trim() ||
        price === undefined ||
        price === null ||
        price === "" ||
        typeof price === "boolean" ||
        !Number.isFinite(Number(price)) ||
        pages === undefined ||
        pages === null ||
        pages === "" ||
        typeof pages === "boolean" ||
        !Number.isFinite(Number(pages)) ||
        Number(price) < 0 ||
        Number(pages) <= 0
    ) {
        return res.status(400).json({
            message: "Valid title, author, numeric price and pages are required"
        });
    }

    db.run(
        `INSERT INTO book (title, author, price, pages)
         VALUES (?, ?, ?, ?)`,
        [title.trim(), author.trim(), Number(price), Number(pages)],
        function (err) {
            if (err) {
                return res.status(500).json({
                    message: "Unable to add book"
                });
            }

            res.status(201).json({
                message: "Book added successfully",
                bookId: this.lastID
            });
        }
    );
});


// PUT: Update an existing book
app.put("/books/:bookId/", (req, res) => {
    const { bookId } = req.params;
    const { title, author, price, pages } = req.body;

    if (
        typeof title !== "string" ||
        !title.trim() ||
        typeof author !== "string" ||
        !author.trim() ||
        price === undefined ||
        price === null ||
        price === "" ||
        typeof price === "boolean" ||
        !Number.isFinite(Number(price)) ||
        pages === undefined ||
        pages === null ||
        pages === "" ||
        typeof pages === "boolean" ||
        !Number.isFinite(Number(pages)) ||
        Number(price) < 0 ||
        Number(pages) <= 0
    ) {
        return res.status(400).json({
            message: "Valid title, author, numeric price and pages are required"
        });
    }

    db.run(
        `UPDATE book
         SET title = ?, author = ?, price = ?, pages = ?
         WHERE id = ?`,
        [title.trim(), author.trim(), Number(price), Number(pages), bookId],
        function (err) {
            if (err) {
                return res.status(500).json({
                    message: "Unable to update book"
                });
            }

            if (this.changes === 0) {
                return res.status(404).json({
                    message: "Book not found"
                });
            }

            res.status(200).json({
                message: "Book updated successfully"
            });
        }
    );
});


// DELETE: Delete a book
app.delete("/books/:bookId/", (req, res) => {
    const { bookId } = req.params;

    db.run(
        "DELETE FROM book WHERE id = ?",
        [bookId],
        function (err) {
            if (err) {
                return res.status(500).json({
                    message: "Unable to delete book"
                });
            }

            if (this.changes === 0) {
                return res.status(404).json({
                    message: "Book not found"
                });
            }

            res.status(200).json({
                message: "Book deleted successfully"
            });
        }
    );
});


// Start server after database initialization
db.get("SELECT COUNT(*) AS count FROM book", (err) => {
    if (err) {
        console.error("Database initialization failed:", err.message);
        process.exit(1);
    }

    app.listen(PORT, () => {
        console.log(`Server running at http://localhost:${PORT}/`);
    });
});