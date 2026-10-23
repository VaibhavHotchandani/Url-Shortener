
let urlInput = document.getElementById("urlInput");
let shortenBtn = document.getElementById("shortenBtn");
let shortUrl = document.getElementById("shortUrl");
let copyBtn = document.getElementById("copyBtn");
let result = document.getElementById("result");
let historymessagemessage = document.getElementById("historymessage");

shortenBtn.addEventListener("click", async function () {
    let originalUrl = urlInput.value.trim();

    if (originalUrl === "") {
        message.textContent = "Please enter a URL";
        result.style.display = "none";
        return;
    }

    try {
        let response = await fetch("/result", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                originalUrl: originalUrl
            })
        });

        let data = await response.json();

        if (!response.ok) {
            message.textContent = data.message;
            result.style.display = "none";
            return;
        }

        shortUrl.value = data.shortUrl;
        result.style.display = "flex";
        message.textContent = "URL shortened successfully!";

    } catch (error) {
        message.textContent = "Something went wrong. Please try again.";
        console.log(error);
    }
});

copyBtn.addEventListener("click", async function () {
    try {
        await navigator.clipboard.writeText(shortUrl.value);
        message.textContent = "URL copied!";
    } catch (error) {
        message.textContent = "Unable to copy the URL.";
        console.log(error);
    }
});

const urlTable = document.getElementById("urlTable");
const totalUrls = document.getElementById("totalUrls");
const totalClicks = document.getElementById("totalClicks");
const message = document.getElementById("message");
const searchInput = document.getElementById("searchInput");

let allUrls = [];

async function loadUrls() {
    try {
        const response = await fetch("/api/urls");

        if (!response.ok) {
            throw new Error("Failed to fetch URLs");
        }

        allUrls = await response.json();

        totalUrls.textContent = allUrls.length;

        totalClicks.textContent = allUrls.reduce(
            (sum, url) => sum + Number(url.clicks || 0),
            0
        );

        message.textContent = "";

        displayUrls(allUrls);

    } catch (error) {
        console.log(error);
        message.textContent = "Could not load URLs. Please try again.";
    }
}

function displayUrls(urls) {
    urlTable.replaceChildren();

    if (urls.length === 0) {
        message.textContent = "No URLs found.";
        return;
    }

    message.textContent = "";

    urls.forEach((url) => {
        const row = document.createElement("tr");

        const originalCell = document.createElement("td");
        originalCell.className = "original-link";
        originalCell.textContent = url.original_url;

        const shortCell = document.createElement("td");
        const shortAnchor = document.createElement("a");

        const shortUrl =
            window.location.origin + "/" + url.shortened_url;

        shortAnchor.href = shortUrl;
        shortAnchor.textContent = shortUrl;
        shortAnchor.className = "short-link";
        shortAnchor.target = "_blank";
        shortAnchor.rel = "noopener noreferrer";

        shortCell.appendChild(shortAnchor);

        const dateCell = document.createElement("td");
        dateCell.textContent = url.created_at
            ? new Date(url.created_at).toLocaleDateString()
            : "Unknown";

        const clicksCell = document.createElement("td");
        clicksCell.textContent = url.clicks ?? 0;

        const actionCell = document.createElement("td");
        const copyButton = document.createElement("button");

        copyButton.textContent = "Copy";

        copyButton.addEventListener("click", async () => {
            try {
                await navigator.clipboard.writeText(shortUrl);
                copyButton.textContent = "Copied!";

                setTimeout(() => {
                    copyButton.textContent = "Copy";
                }, 1500);
            } catch (error) {
                console.log(error);
                alert("Could not copy the URL.");
            }
        });

        actionCell.appendChild(copyButton);

        row.append(
            originalCell,
            shortCell,
            dateCell,
            clicksCell,
            actionCell
        );

        urlTable.appendChild(row);
    });
}

searchInput.addEventListener("input", () => {
    const searchText = searchInput.value.toLowerCase();

    const filteredUrls = allUrls.filter((url) => {
        return (
            url.original_url.toLowerCase().includes(searchText) ||
            url.shortened_url.toLowerCase().includes(searchText)
        );
    });

    displayUrls(filteredUrls);
});

loadUrls();

