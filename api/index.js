require("dotenv").config();

const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("../db");

// middleware
app.use(cors());
app.use(express.json());

// routes
// get list of all player usernames
app.get("/players", async (req, res) => {
    console.log(req.path, req.method);
    try {
        const players = await pool.query(
            "SELECT username FROM players ORDER BY rank ASC"
        );
        res.json(players.rows.map((value) => value.username));
    } catch (err) {
        console.error(err.message);
    }
});

// get data for a player
app.get("/players/:username", async (req, res) => {
    console.log(req.path, req.method);
    try {
        const { username } = req.params;
        const player = await pool.query(
            "SELECT * FROM players WHERE username=$1",
            [username]
        );
        res.json(player.rows);
    } catch (err) {
        console.error(err.message);
    }
});

// listen
app.listen(process.env.PORT || 3001, () => {
    console.log("Listening on port", process.env.PORT || 3001);
});
