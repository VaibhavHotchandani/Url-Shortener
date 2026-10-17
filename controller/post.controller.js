
const db = require("../db/db");
const crypto = require("crypto");

function returnurl(req, res) {
    const originalUrl = req.body.originalUrl;

    if (originalUrl === "") {
        return res.status(400).json({
            message: "Please enter a URL"
        });
    }

    const shortCode = crypto.randomBytes(4).toString("hex");

    const sql = "INSERT INTO urls (original_url, shortened_url) VALUES (?, ?)";

    db.query(sql, [originalUrl, shortCode], (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).json({
                message: "Database error"
            });
        }

        const shortUrl = `${req.protocol}://${req.get("host")}/${shortCode}`;

        res.status(201).json({
            shortUrl: shortUrl
        });
    });
}

module.exports = { returnurl };
