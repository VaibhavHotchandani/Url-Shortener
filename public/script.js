
const shortenForm = document.getElementById("shortenForm");
const urlInput = document.getElementById("urlInput");
const message = document.getElementById("message");
const result = document.getElementById("result");
const shortUrlLink = document.getElementById("shortUrlLink");
const copyBtn = document.getElementById("copyBtn");
const shortenBtn = document.getElementById("shortenBtn");

const urlTable = document.getElementById("urlTable");
const totalUrls = document.getElementById("totalUrls");
const totalClicks = document.getElementById("totalClicks");
const searchInput = document.getElementById("searchInput");
const refreshBtn = document.getElementById("refreshBtn");
const historyMessage = document.getElementById("historyMessage");

let allUrls = [];


// 1. Shorten a URL
shortenForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const originalUrl = urlInput.value.trim();

    try {
        shortenBtn.disabled = true;
        message.textContent = "Shortening URL...";

        const response = await fetch("/result", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ originalUrl })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Could not shorten URL");
        }

        shortUrlLink.href = data.shortUrl;
        shortUrlLink.textContent = data.shortUrl;
        result.hidden = false;

        message.textContent = "URL shortened successfully!";

        await loadUrls();
    } catch (error) {
        message.textContent = error.message;
    } finally {
        shortenBtn.disabled = false;
    }
});


// 2. Copy the newly shortened URL
copyBtn.addEventListener("click", () => {
    copyText(shortUrlLink.href);
});


// 3. Copy text to clipboard
async function copyText(text) {
    try {
        await navigator.clipboard.writeText(text);
        message.textContent = "Copied!";
    } catch (error) {
        message.textContent = "Could not copy the URL.";
    }
}


// 4. Get all saved URLs from the backend
async function loadUrls() {
    try {
        historyMessage.textContent = "Loading URLs...";

        const response = await fetch("/api/urls");

        if (!response.ok) {
            throw new Error("Could not load URLs");
        }

        allUrls = await response.json();

        // Calculate total URLs and total clicks
        totalUrls.textContent = allUrls.length;

        totalClicks.textContent = allUrls.reduce(
            (sum, url) => sum + Number(url.clicks || 0),
            0
        );

        displayUrls(allUrls);
    } catch (error) {
        historyMessage.textContent = error.message;
    }
}


// 5. Display URLs in the table
function displayUrls(urls) {
    urlTable.innerHTML = "";

    if (urls.length === 0) {
        historyMessage.textContent = "No URLs found.";
        return;
    }

    historyMessage.textContent = "";

    urls.forEach((url) => {
        const shortUrl =
            `${window.location.origin}/${encodeURIComponent(url.shortened_url)}`;

        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${escapeHtml(url.original_url)}</td>
            <td><a href="${shortUrl}" target="_blank">${shortUrl}</a></td>
            <td>${url.created_at ? new Date(url.created_at).toLocaleDateString() : "—"}</td>
            <td>${Number(url.clicks || 0)}</td>
            <td><button class="copy-button">Copy</button></td>
        `;

        const copyButton = row.querySelector(".copy-button");

        copyButton.addEventListener("click", () => {
            copyText(shortUrl);
        });

        urlTable.appendChild(row);
    });
}


// 6. Search URLs
searchInput.addEventListener("input", () => {
    const searchText = searchInput.value.toLowerCase();

    const filteredUrls = allUrls.filter((url) =>
        url.original_url.toLowerCase().includes(searchText) ||
        url.shortened_url.toLowerCase().includes(searchText)
    );

    displayUrls(filteredUrls);
});


// 7. Refresh the URL table
refreshBtn.addEventListener("click", loadUrls);


// 8. Prevent URL text from being treated as HTML
function escapeHtml(text) {
    const replacements = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
    };

    return String(text || "").replace(/[&<>"']/g, (character) => {
        return replacements[character];
    });
}


// 9. Load saved URLs when the page opens
loadUrls();
