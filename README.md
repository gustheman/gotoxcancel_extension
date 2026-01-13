# GoToXCancel Chrome Extension

A lightweight, privacy-focused Chrome extension that automatically redirects `twitter.com` and `x.com` links to `xcancel.com` (a Nitter instance).

## Features

*   **Instant Redirection:** Uses the `declarativeNetRequest` API for zero-latency network redirects.
*   **Fail-Safe Mode:** A background service worker monitors tab updates to catch any redirects missed by the network layer (e.g., complex redirects from Google Chat/Docs).
*   **Client-Side Routing:** A content script handles direct link clicks on supported pages for a seamless user experience.
*   **Privacy Friendly:** Runs locally on your browser. No data collection.

## Installation

1.  Clone this repository.
2.  Open Chrome and navigate to `chrome://extensions/`.
3.  Enable **Developer mode** in the top right corner.
4.  Click **Load unpacked**.
5.  Select the directory containing this project.

## Development

*   **Manifest V3:** Built using the latest WebExtension standards.
*   **Architecture:**
    *   `manifest.json`: Configuration and permissions.
    *   `rules.json`: Network-level redirection rules.
    *   `background.js`: Event listener for tab updates (backup redirection).
    *   `content.js`: Click interception for direct links.

## License

MIT
