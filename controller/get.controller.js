
const db = require("../db/db");

function redirectUrl(req, res) {
    const shortened_url = req.params.shortCode;

    const sql = "SELECT original_url FROM urls WHERE shortened_url=?";

    db.query(sql, [shortened_url], (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).send("Database error");
        }

        if (result.length === 0) {
            return res.status(404).send("Short URL not found");
        }

        const originalUrl = result[0].original_url;

        res.redirect(originalUrl);
    });
}

module.exports = { redirectUrl };
