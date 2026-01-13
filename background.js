/**
 * GoToXCancel Background Service Worker
 * Acts as a fail-safe to ensure any tab that lands on x.com/twitter.com
 * gets redirected to xcancel.com, even if the declarative rules miss it.
 */

function getRedirectUrl(urlString) {
  try {
    const url = new URL(urlString);
    const host = url.hostname;

    if (host === 'x.com' || host.endsWith('.x.com') ||
        host === 'twitter.com' || host.endsWith('.twitter.com')) {
      
      url.hostname = 'xcancel.com';
      url.protocol = 'https:';
      return url.href;
    }
  } catch (e) {
    return null;
  }
  return null;
}

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  // We check 'status' to catch it early, but 'url' is the critical piece
  if (changeInfo.url || (changeInfo.status === 'loading' && tab.url)) {
    const currentUrl = changeInfo.url || tab.url;
    
    if (!currentUrl) return;

    const newUrl = getRedirectUrl(currentUrl);

    if (newUrl && newUrl !== currentUrl) {
      console.log(`[Background] Redirecting tab ${tabId} to ${newUrl}`);
      chrome.tabs.update(tabId, { url: newUrl });
    }
  }
});
