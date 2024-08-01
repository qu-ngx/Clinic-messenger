import express from "express";

const app = express();

app.get("/", (req, res) => {
    res.send("Hello world");
});

app.listen(9000, () => {
    console.log("Server is running on port 9000");
});