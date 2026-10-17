# 🔗 URL Shortener Web Application
Hello guys , just started on my web development journey ....and I have built a basic full-stack URL shortener application built with **Node.js**, **Express**, and **MySQL**, deployed on **Render** with a remote cloud database managed on **Aiven**.

🌐 **Live Demo:** [url-shortener-3-9xok.onrender.com](https://url-shortener-3-9xok.onrender.com/)


🧠 Concepts & Learnings
Through building and deploying this project, I gained hands-on experience in:

1. Modular Backend Architecture (MVC Pattern)
Separated Express routing (router/) from request execution logic (controller/) and database connections (db/).

Organized routes into dedicated handlers (GET for reading/redirecting and POST for generating links).

2. Cryptographic Utilities
Explored Node.js's built-in crypto module to generate unique, secure short codes (e.g., crypto.randomBytes() or crypto.randomUUID()) to avoid duplicate key conflicts in MySQL.

3. Remote Database Integration & Cloud Security
Migrated local MySQL databases (backup.sql) to cloud infrastructure using Aiven MySQL.

Enforced encrypted SSL/TLS connections between Express and the cloud database (ssl: { rejectUnauthorized: false }).

4. Full-Stack Data Flow
Connected the HTML/CSS user interface to Express API endpoints using asynchronous JavaScript (async/await and fetch).

Managed DOM updates dynamically to show shortened links instantly upon form submission.

5. Production Cloud Deployment (Render + Aiven)
Deployed a multi-service cloud architecture (Render for backend computing + Aiven for persistent database storage).

Handled production environment configuration, including dynamic port binding (process.env.PORT) required by cloud platforms.

Protected sensitive credentials using .env files and .gitignore rules to keep database passwords safe from public repositories.
