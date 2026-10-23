
const db = require("../db/db");

function getAllUrls(req, res) {
    const sql = `
        SELECT id, original_url, shortened_url, clicks, created_at
        FROM urls
        ORDER BY created_at DESC
    `;

    db.query(sql, (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).json({
                message: "Database error"
            });
        }

        res.status(200).json(result);
    });
}

module.exports = { getAllUrls };
