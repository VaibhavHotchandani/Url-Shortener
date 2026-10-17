
let urlInput = document.getElementById("urlInput");
let shortenBtn = document.getElementById("shortenBtn");
let shortUrl = document.getElementById("shortUrl");
let copyBtn = document.getElementById("copyBtn");
let result = document.getElementById("result");
let message = document.getElementById("message");

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
