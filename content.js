/**
 * GoToXCancel Content Script
 * Handles simple, direct link clicks in the same tab to avoid round-trips.
 * Complex cases (new tabs, Google wrappers) are delegated to the Background Script.
 */

document.addEventListener('click', (event) => {
  // Use composedPath to handle Shadow DOM and find the actual target path
  const path = event.composedPath();
  const anchor = path.find(element => element.tagName === 'A' && element.href);

  if (!anchor) return;

  // 1. Ignore Modifier Keys & New Tabs
  // We let the browser handle these naturally. The Background Script/DNR will 
  // catch the destination URL in the new tab.
  if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || anchor.target === '_blank') {
    return;
  }

  try {
    const url = new URL(anchor.href);
    const host = url.hostname;

    // 2. Ignore Google/Redirect Wrappers
    // If the host is NOT x.com/twitter.com (e.g. google.com), we ignore it.
    // The browser will follow the redirect, and our Background Script will catch the final URL.
    if (host !== 'x.com' && !host.endsWith('.x.com') &&
        host !== 'twitter.com' && !host.endsWith('.twitter.com')) {
      return;
    }

    // 3. Handle Direct Links
    console.log(`GoToXCancel: Client-side redirect for ${host}`);
    
    event.preventDefault();
    event.stopPropagation();

    url.hostname = 'xcancel.com';
    url.protocol = 'https:';
    url.port = '';

    window.location.assign(url.href);

  } catch (e) {
    // Ignore errors
  }
}, true);
