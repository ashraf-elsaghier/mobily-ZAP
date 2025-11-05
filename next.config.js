// /** @type {import('next').NextConfig} */
// const { i18n } = require("./next-i18next.config");

// const nextConfig = {
//   reactStrictMode: true,
//   i18n,
//   swcMinify: false,
//   keySeparator: ".",
//   returnEmptyString: false,
//   reloadOnPrerender: process.env.NODE_ENV === "development",
// };

// module.exports = nextConfig;

// /** @type {import('next').NextConfig} */
// const { i18n } = require("./next-i18next.config");

// // Security Headers Configuration
// const securityHeaders = [
//   {
//     key: "Content-Security-Policy",
//     value: `
//       default-src 'self';
//       script-src 'self' 'unsafe-inline' 'unsafe-eval' https://*.googleapis.com https://*.google.com https://www.googletagmanager.com;
//       style-src 'self' 'unsafe-inline' https: http:;
//       style-src-elem 'self' 'unsafe-inline' https: http:;
//       img-src 'self' data: blob: https: http:
//         https://res.cloudinary.com
//         http://res.cloudinary.com
//         https://*.googleapis.com
//         https://*.gstatic.com;
//       connect-src 'self'
//         https://api.fms.mobily.saferoad.net
//         wss://socketio.fms.saferoad.net
//         ws://socketio.fms.saferoad.net
//         https://www.google-analytics.com
//         https://*.googleapis.com
//         https://*.google.com;
//       font-src 'self' https: data:;
//       frame-src 'self' https://*.google.com;
//       worker-src 'self' blob:;
//       child-src 'self' blob:;
//       frame-ancestors 'none';
//       base-uri 'self';
//       form-action 'self';
//     `
//       .replace(/\s+/g, " ")
//       .trim(),
//   },
//   {
//     key: "Referrer-Policy",
//     value: "strict-origin-when-cross-origin",
//   },
//   {
//     key: "X-Frame-Options",
//     value: "DENY",
//   },
//   {
//     key: "X-Content-Type-Options",
//     value: "nosniff",
//   },
//   {
//     key: "X-XSS-Protection",
//     value: "1; mode=block",
//   },
//   {
//     key: "Permissions-Policy",
//     value: "camera=(), microphone=(), geolocation=()",
//   },
// ];

// const nextConfig = {
//   reactStrictMode: true,
//   i18n,
//   swcMinify: false,
//   keySeparator: ".",
//   returnEmptyString: false,
//   reloadOnPrerender: process.env.NODE_ENV === "development",

//   // Add security headers configuration
//   async headers() {
//     return [
//       {
//         source: "/(.*)",
//         headers: securityHeaders,
//       },
//     ];
//   },
// };

// module.exports = nextConfig;

// /** @type {import('next').NextConfig} */
// const { i18n } = require("./next-i18next.config");

// // --- 1. CONFIGURATION FLAGS ---
// const isProd = process.env.NODE_ENV === "production";
// const isDev = !isProd;

// // --- 2. CSP SOURCE ARRAYS (Define sources outside the main string) ---

// // Font Awesome & Google Fonts sources
// const externalStyles = [
//   "https://fonts.googleapis.com",
//   "https://cdnjs.cloudflare.com", // Added for Font Awesome CSS
//   "https://stackpath.bootstrapcdn.com", // Added for Font Awesome CSS
// ];

// // Font sources
// const externalFonts = [
//   "https:", // Allows HTTPS fonts
//   "data:", // Allows base64 encoded fonts
//   "https://cdnjs.cloudflare.com", // Added for Font Awesome fonts
//   "https://stackpath.bootstrapcdn.com", // Added for Font Awesome fonts
// ];

// // Script sources (Google Analytics, Maps, etc.)
// const scriptSources = [
//   "'self'",
//   "https://*.googleapis.com",
//   "https://*.google.com",
//   "https://www.googletagmanager.com",
// ];

// // Connection sources (APIs, WebSockets, Analytics)
// const connectSources = [
//   "'self'",
//   "https://api.fms.mobily.saferoad.net",
//   "wss://socketio.fms.saferoad.net",
//   "https://www.google-analytics.com",
//   "https://*.googleapis.com",
//   "https://*.google.com",
// ];

// // Image sources
// const imageSources = [
//   "'self'",
//   "data:",
//   "blob:",
//   "https://res.cloudinary.com",
//   "https://*.googleapis.com",
//   "https://*.gstatic.com",
// ];

// // --- 3. CONDITIONAL ADDITIONS FOR DEVELOPMENT (Fixes the HMR error) ---
// if (isDev) {
//   // Add development essentials only when needed
//   scriptSources.push("'unsafe-eval'"); // Required for Next.js HMR/Fast Refresh
//   ex.push("'unsafe-inline'"); // Required for Next.js inline styles in dev
//   connectSources.push("http:"); // Allows non-secure API/socket connections in dev
//   connectSources.push("ws:"); // Allows non-secure WebSockets in dev
//   imageSources.push("http:");
//   imageSources.push("https:"); // Included to be explicit for dev
// }

// // --- 4. BUILD THE FINAL CSP STRING ---
// const csp = `
//     default-src 'self';
//     object-src 'none';
//     base-uri 'self';
//     frame-ancestors 'none';
//     upgrade-insecure-requests;

//     script-src ${scriptSources.join(" ")};
//     style-src 'self' ${externalStyles.join(" ")};
//     style-src-elem 'self' ${externalStyles.join(" ")};
//     img-src ${imageSources.join(" ")};
//     connect-src ${connectSources.join(" ")};
//     font-src 'self' ${externalFonts.join(" ")};
//     frame-src 'self' https://*.google.com;
//     worker-src 'self' blob:;
//     child-src 'self' blob:;
// `;

// // Clean up the string by removing extra whitespace
// const cspValue = csp.replace(/\s+/g, " ").trim();

// // --- 5. DEFINE ALL SECURITY HEADERS ---
// const securityHeaders = [
//   {
//     key: "Content-Security-Policy",
//     value: cspValue,
//   },
//   {
//     key: "Referrer-Policy",
//     value: "strict-origin-when-cross-origin",
//   },
//   {
//     key: "X-Frame-Options",
//     value: "DENY",
//   },
//   {
//     key: "X-Content-Type-Options",
//     value: "nosniff",
//   },
//   {
//     key: "X-XSS-Protection",
//     value: "1; mode=block",
//   },
//   {
//     key: "Permissions-Policy",
//     value: "camera=(), microphone=(), geolocation=()",
//   },
// ];

// // --- 6. NEXT.JS CONFIGURATION OBJECT ---
// const nextConfig = {
//   reactStrictMode: true,
//   i18n,
//   // Other existing config options:
//   swcMinify: false,
//   keySeparator: ".",
//   returnEmptyString: false,
//   reloadOnPrerender: isDev,

//   // Add security headers configuration
//   async headers() {
//     return [
//       {
//         source: "/(.*)", // Apply to all paths
//         headers: securityHeaders,
//       },
//     ];
//   },
// };

// module.exports = nextConfig;

// /** @type {import('next').NextConfig} */
// const { i18n } = require("./next-i18next.config");

// // --- 1. CONFIGURATION FLAGS ---
// const isProd = process.env.NODE_ENV === "production";
// const isDev = !isProd;

// // --- 2. CSP SOURCE ARRAYS (Define all allowed sources) ---

// // Font Awesome & Google Fonts sources
// let styleSources = [
//   "'self'",
//   "https://fonts.googleapis.com",
//   "https://cdnjs.cloudflare.com", // Added for Font Awesome CSS
//   "https://stackpath.bootstrapcdn.com", // Added for Font Awesome CSS
// ];

// // Script sources (Google Analytics, Maps, etc.)
// let scriptSources = [
//   "'self'",
//   "https://*.googleapis.com",
//   "https://*.google.com",
//   "https://www.googletagmanager.com",
// ];

// // Connection sources (APIs, WebSockets, Analytics)
// let connectSources = [
//   "'self'",
//   "https://api.fms.mobily.saferoad.net",
//   "wss://socketio.fms.saferoad.net",
//   "https://www.google-analytics.com",
//   "https://*.googleapis.com",
//   "https://*.google.com",
// ];

// // Image sources
// let imageSources = [
//   "'self'",
//   "data:",
//   "blob:",
//   "https://res.cloudinary.com",
//   "https://*.googleapis.com",
//   "https://*.gstatic.com",
// ];

// // Font sources
// let fontSources = [
//   "'self'",
//   "https:",
//   "data:",
//   "https://cdnjs.cloudflare.com", // Added for Font Awesome fonts
//   "https://stackpath.bootstrapcdn.com", // Added for Font Awesome fonts
// ];

// // --- 3. CONDITIONAL ADDITIONS FOR DEVELOPMENT (Crucial for HMR/Fast Refresh) ---
// if (isDev) {
//   // Fixes: "Refused to execute inline script" (requires 'unsafe-inline')
//   scriptSources.push("'unsafe-inline'");
//   // Fixes: "Uncaught EvalError" (requires 'unsafe-eval')
//   scriptSources.push("'unsafe-eval'");

//   // Allows necessary non-secure connections and styles for local testing
//   connectSources.push("http:");
//   connectSources.push("ws:");
//   imageSources.push("http:");

//   // Allows 'unsafe-inline' for styles in dev mode
//   styleSources.push("'unsafe-inline'");
// }

// // --- 4. BUILD THE FINAL CSP STRING ---
// const csp = `
//     default-src 'self';
//     object-src 'none';
//     base-uri 'self';
//     frame-ancestors 'none';
//     upgrade-insecure-requests;

//     script-src ${scriptSources.join(" ")};
//     style-src ${styleSources.join(" ")};
//     style-src-elem ${styleSources.join(" ")};
//     img-src ${imageSources.join(" ")};
//     connect-src ${connectSources.join(" ")};
//     font-src ${fontSources.join(" ")};

//     frame-src 'self' https://*.google.com;
//     worker-src 'self' blob:;
//     child-src 'self' blob:;
// `;

// // Clean up the string by removing extra whitespace
// const cspValue = csp.replace(/\s+/g, " ").trim();

// // --- 5. DEFINE ALL SECURITY HEADERS ---
// const securityHeaders = [
//   {
//     key: "Content-Security-Policy",
//     value: cspValue,
//   },
//   {
//     key: "Referrer-Policy",
//     value: "strict-origin-when-cross-origin",
//   },
//   {
//     key: "X-Frame-Options",
//     value: "DENY",
//   },
//   {
//     key: "X-Content-Type-Options",
//     value: "nosniff",
//   },
//   {
//     key: "X-XSS-Protection",
//     value: "1; mode=block",
//   },
//   {
//     key: "Permissions-Policy",
//     value: "camera=(), microphone=(), geolocation=()",
//   },
// ];

// // --- 6. NEXT.JS CONFIGURATION OBJECT ---
// const nextConfig = {
//   reactStrictMode: true,
//   i18n,
//   // Other existing config options:
//   swcMinify: false,
//   keySeparator: ".",
//   returnEmptyString: false,
//   reloadOnPrerender: isDev,

//   // Add security headers configuration
//   async headers() {
//     return [
//       {
//         source: "/(.*)", // Apply to all paths
//         headers: securityHeaders,
//       },
//     ];
//   },
// };

// // module.exports = nextConfig;
// /** @type {import('next').NextConfig} */

// const { i18n } = require("./next-i18next.config");

// // --- 1. CONFIGURATION FLAGS ---
// const isProd = process.env.NODE_ENV === "production";
// const isDev = !isProd;

// // --- 2. CSP SOURCE ARRAYS (Define all allowed sources) ---

// // Font Awesome & Google Fonts sources
// let styleSources = [
//   "'self'",
//   "https://fonts.googleapis.com",
//   "https://cdnjs.cloudflare.com", // Added for Font Awesome CSS
//   "https://stackpath.bootstrapcdn.com", // Added for Font Awesome CSS
// ];

// // Script sources (Google Analytics, Maps, etc.)
// let scriptSources = [
//   "'self'",
//   "https://*.googleapis.com",
//   "https://*.google.com",
//   "https://www.googletagmanager.com",
// ];

// // Connection sources (APIs, WebSockets, Analytics)
// let connectSources = [
//   "'self'",
//   "https://api.fms.mobily.saferoad.net",
//   "wss://socketio.fms.saferoad.net",
//   "https://www.google-analytics.com",
//   "https://*.googleapis.com",
//   "https://*.google.com",
// ];

// // Image sources
// let imageSources = [
//   "'self'",
//   "data:",
//   "blob:",
//   "https://res.cloudinary.com",
//   "https://*.googleapis.com",
//   "https://*.gstatic.com",
// ];

// // Font sources
// let fontSources = [
//   "'self'",
//   "https:",
//   "data:",
//   "https://cdnjs.cloudflare.com", // Added for Font Awesome fonts
//   "https://stackpath.bootstrapcdn.com", // Added for Font Awesome fonts
// ];

// // --- 3. CONDITIONAL ADDITIONS FOR DEVELOPMENT (Crucial for HMR/Fast Refresh) ---
// if (isDev) {
//   // Fixes: "Refused to execute inline script" (requires 'unsafe-inline')
//   scriptSources.push("'unsafe-inline'");
//   // Fixes: "Uncaught EvalError" (requires 'unsafe-eval')
//   scriptSources.push("'unsafe-eval'");

//   // Allows necessary non-secure connections and styles for local testing
//   connectSources.push("http:");
//   connectSources.push("ws:");
//   imageSources.push("http:");

//   // Allows 'unsafe-inline' for styles in dev mode
//   styleSources.push("'unsafe-inline'");
// }

// // --- 4. BUILD THE FINAL CSP STRING ---
// const csp = `
//     default-src 'self';
//     object-src 'none';
//     base-uri 'self';
//     frame-ancestors 'none';
//     upgrade-insecure-requests;

//     script-src ${scriptSources.join(" ")};
//     style-src ${styleSources.join(" ")};
//     style-src-elem ${styleSources.join(" ")};
//     img-src ${imageSources.join(" ")};
//     connect-src ${connectSources.join(" ")};
//     font-src ${fontSources.join(" ")};

//     frame-src 'self' https://*.google.com;
//     worker-src 'self' blob:;
//     child-src 'self' blob:;
// `;

// // Clean up the string by removing extra whitespace
// const cspValue = csp.replace(/\s+/g, " ").trim();

// // --- 5. DEFINE ALL SECURITY HEADERS ---
// const securityHeaders = [
//   {
//     key: "Content-Security-Policy",
//     value: cspValue,
//   },
//   {
//     key: "Referrer-Policy",
//     value: "strict-origin-when-cross-origin",
//   },
//   {
//     key: "X-Frame-Options",
//     value: "DENY",
//   },
//   {
//     key: "X-Content-Type-Options",
//     value: "nosniff",
//   },
//   {
//     key: "X-XSS-Protection",
//     value: "1; mode=block",
//   },
//   {
//     key: "Permissions-Policy",
//     value: "camera=(), microphone=(), geolocation=()",
//   },
// ];

// // --- 6. NEXT.JS CONFIGURATION OBJECT ---
// const nextConfig = {
//   reactStrictMode: true,
//   i18n,
//   // Other existing config options:
//   swcMinify: false,
//   keySeparator: ".",
//   returnEmptyString: false,
//   reloadOnPrerender: isDev,

//   // Add security headers configuration
//   async headers() {
//     return [
//       {
//         source: "/(.*)", // Apply to all paths
//         headers: securityHeaders,
//       },
//     ];
//   },
// };

// module.exports = nextConfig;
/** @type {import('next').NextConfig} */
const { i18n } = require("./next-i18next.config");

// --- 1. CONFIGURATION FLAGS ---
const isProd = process.env.NODE_ENV === "production";
const isDev = !isProd;

// --- 2. CSP SOURCE ARRAYS (Define all allowed sources for production) ---

// Style sources
let styleSources = [
  "'self'",
  "https://fonts.googleapis.com",
  "https://cdnjs.cloudflare.com",
  "https://stackpath.bootstrapcdn.com",
];

// Script sources
let scriptSources = [
  "'self'",
  "https://*.googleapis.com",
  "https://*.google.com",
  "https://www.googletagmanager.com",
];

// Connection sources (APIs, WebSockets, Analytics)
let connectSources = [
  "'self'",
  "https://api.fms.mobily.saferoad.net",
  "wss://socketio.fms.mobily.saferoad.net",
  "https://www.google-analytics.com",
  "https://*.googleapis.com",
  "https://*.google.com",
];

// Image sources
let imageSources = [
  "'self'",
  "data:",
  "blob:",
  "https://res.cloudinary.com",
  "https://*.googleapis.com",
  "https://*.gstatic.com",
];

// Font sources (FIXED: Specific domains only to avoid wildcard finding)
let fontSources = [
  "'self'",
  "data:",
  "https://fonts.gstatic.com",
  "https://cdnjs.cloudflare.com",
  "https://stackpath.bootstrapcdn.com",
];

// --- 3. CONDITIONAL ADDITIONS FOR DEVELOPMENT (Crucial for HMR/Fast Refresh) ---
if (isDev) {
  // Fixes "Refused to execute inline script" and "Uncaught EvalError"
  scriptSources.push("'unsafe-inline'");
  scriptSources.push("'unsafe-eval'");

  // Allows inline styles in dev mode
  styleSources.push("'unsafe-inline'");

  // Allows necessary non-secure connections and http images for local testing
  connectSources.push("http:");
  connectSources.push("ws:");
  imageSources.push("http:");
}

// --- 4. BUILD THE FINAL CSP STRING ---
const csp = `
    default-src 'self';
    object-src 'none';
    base-uri 'self';
    frame-ancestors 'none';
    upgrade-insecure-requests;

    script-src ${scriptSources.join(" ")};
    style-src ${styleSources.join(" ")};
    style-src-elem ${styleSources.join(" ")};
    img-src ${imageSources.join(" ")};
    connect-src ${connectSources.join(" ")};
    font-src ${fontSources.join(" ")};
    
    frame-src 'self' https://*.google.com;
    worker-src 'self' blob:;
    child-src 'self' blob:;
`;

// Clean up the string by removing extra whitespace
const cspValue = csp.replace(/\s+/g, " ").trim();

// --- 5. DEFINE ALL SECURITY HEADERS ---
const securityHeaders = [
  {
    key: "Content-Security-Policy",
    value: cspValue,
  },
  {
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin",
  },
  {
    key: "X-Frame-Options",
    value: "DENY",
  },
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  {
    key: "X-XSS-Protection",
    value: "1; mode=block",
  },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=()",
  },
];

// --- 6. NEXT.JS CONFIGURATION OBJECT ---
const nextConfig = {
  reactStrictMode: true,
  i18n,
  swcMinify: false,
  keySeparator: ".",
  returnEmptyString: false,
  reloadOnPrerender: isDev,

  // Add security headers configuration
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
};

module.exports = nextConfig;
