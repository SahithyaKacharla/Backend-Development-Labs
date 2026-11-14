const express = require("express");

const connectDB = require("./database");

const { router, setDatabase } = require("./routes/auth");

const app = express();

app.use(express.json());

async function startServer() {

    const db = await connectDB();

    setDatabase(db);

    app.use("/", router);

    app.listen(3000, () => {
        console.log("Server running at http://localhost:3000");
    });
}

startServer();