// In development: requests go to Vite's proxy at /gov-scraper/* which forwards
// server-side to gov-data-scraper.onrender.com — this bypasses the browser CORS restriction.
// In production: use the full URL (requires backend to have CORS enabled for your domain).
const BASE_URL = import.meta.env.PROD
  ? "https://gov-data-scraper.onrender.com"
  : "/gov-scraper";

/**
 * Fetch with an AbortController timeout.
 */
const fetchWithTimeout = (url, timeoutMs = 45000) => {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeoutMs);
  return fetch(url, { signal: controller.signal }).finally(() => clearTimeout(id));
};

/**
 * Retry a fetch up to `retries` times with exponential backoff.
 */
const fetchWithRetry = async (url, retries = 3, delayMs = 3000) => {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const response = await fetchWithTimeout(url, 45000);
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }
      return await response.json();
    } catch (err) {
      const isLast = attempt === retries;
      if (isLast) throw err;
      console.warn(`API attempt ${attempt} failed, retrying in ${delayMs}ms…`, err.message);
      await new Promise((res) => setTimeout(res, delayMs));
      delayMs *= 2;
    }
  }
};

export const fetchCards = (category) =>
  fetchWithRetry(`${BASE_URL}/api/cards/${category}`);

export const fetchCategory = fetchCards;