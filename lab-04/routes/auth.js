const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const router = express.Router();

const JWT_SECRET = "my_secret_key";

let db;

function setDatabase(database) {
    db = database;
}

// USER REGISTRATION
router.post("/register/", async (req, res) => {
    try {
        const { username, name, password } = req.body;

        if (!username || !name || !password) {
            return res.status(400).json({
                error: "All fields are required"
            });
        }

        // Check whether username already exists
        const existingUser = await db.get(
            "SELECT * FROM users WHERE username = ?",
            [username]
        );

        if (existingUser) {
            return res.status(400).json({
                error: "Username already exists"
            });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert user into database
        await db.run(
            "INSERT INTO users (username, name, password) VALUES (?, ?, ?)",
            [username, name, hashedPassword]
        );

        res.status(201).json({
            message: "Registration successful"
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            error: "Internal server error"
        });
    }
});


// USER LOGIN
router.post("/login/", async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({
                error: "Username and password are required"
            });
        }

        // Find user in database
        const user = await db.get(
            "SELECT * FROM users WHERE username = ?",
            [username]
        );

        if (!user) {
            return res.status(400).json({
                error: "Invalid username"
            });
        }

        // Compare entered password with hashed password
        const isPasswordCorrect = await bcrypt.compare(
            password,
            user.password
        );

        if (!isPasswordCorrect) {
            return res.status(400).json({
                error: "Invalid password"
            });
        }

        // Generate JWT token
        const token = jwt.sign(
            { username: user.username },
            JWT_SECRET
        );

        res.status(200).json({
            jwt_token: token
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            error: "Internal server error"
        });
    }
});

module.exports = { router, setDatabase };