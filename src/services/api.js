// Base URL is read from .env (VITE_API_BASE_URL / VITE_DEV_PROXY_PATH).
// In development Vite proxies VITE_DEV_PROXY_PATH/* → VITE_API_BASE_URL/*
// so the browser never hits the remote origin directly (avoids CORS).
const PROD_URL = import.meta.env.VITE_API_BASE_URL;
const DEV_PATH = import.meta.env.VITE_DEV_PROXY_PATH;

if (!PROD_URL) {
  console.error("VITE_API_BASE_URL is not defined in the environment configuration!");
}
if (!DEV_PATH) {
  console.error("VITE_DEV_PROXY_PATH is not defined in the environment configuration!");
}

const BASE_URL = import.meta.env.PROD ? PROD_URL : DEV_PATH;

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

/**
 * POST a new service request to the backend.
 * All data is sent as query parameters as required by the API.
 * @param {{ fullName, email, phoneNumber, selectedService, description, contactMethod, subject }} data
 */
export const createRequestService = (data) => {
  const params = new URLSearchParams({
    fullName: data.fullName || "",
    email: data.email || "",
    phoneNumber: data.phoneNumber || "",
    selectedService: data.selectedService || "",
    description: data.description || "",
    contactMethod: data.contactMethod || "Email",
    subject: data.subject || "Service request",
  });
  return fetch(`${BASE_URL}/api/request-service/create/?${params.toString()}`, {
    method: "POST",
  }).then((res) => {
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return res.json().catch(() => ({}));
  });
};

/**
 * GET all submitted service requests.
 */
export const getRequestServices = () =>
  fetchWithRetry(`${BASE_URL}/api/request-services/list/`);