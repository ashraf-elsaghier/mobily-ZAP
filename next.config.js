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

// // --- 1. CONFIGURATION FLAGS ---
// const isProd = process.env.NODE_ENV === "production";
// const isDev = !isProd;

// // --- 2. CSP SOURCE ARRAYS ---
// let styleSources = [
//   "'self'",
//   "https://fonts.googleapis.com",
//   "https://cdnjs.cloudflare.com",
//   "https://stackpath.bootstrapcdn.com",
// ];

// let scriptSources = [
//   "'self'",
//   "https://*.googleapis.com",
//   "https://*.google.com",
//   "https://www.googletagmanager.com",
// ];

// let connectSources = [
//   "'self'",
//   "https://api.fms.mobily.saferoad.net",
//   "wss://socketio.fms.mobily.saferoad.net",
//   "https://www.google-analytics.com",
//   "https://*.googleapis.com",
//   "https://*.google.com",
// ];

// let imageSources = [
//   "'self'",
//   "data:",
//   "blob:",
//   "https://res.cloudinary.com",
//   "https://*.googleapis.com",
//   "https://*.gstatic.com",
// ];

// let fontSources = [
//   "'self'",
//   "data:",
//   "https://fonts.gstatic.com",
//   "https://cdnjs.cloudflare.com",
//   "https://stackpath.bootstrapcdn.com",
// ];

// // --- 3. CONDITIONAL ADDITIONS FOR DEVELOPMENT (FIXES EvalError) ---
// if (isDev) {
//   // Fixes: "Uncaught EvalError: Refused to evaluate a string as JavaScript"
//   scriptSources.push("'unsafe-eval'");

//   // Fixes other development-mode issues
//   scriptSources.push("'unsafe-inline'");
//   styleSources.push("'unsafe-inline'");
//   connectSources.push("http:");
//   connectSources.push("ws:");
//   imageSources.push("http:");
// }

// // --- 4. BUILD THE FINAL CSP STRING ---
// const csp = `
//     default-src 'self';
//     object-src 'none';
//     base-uri 'self';
//     frame-ancestors 'none';
//     upgrade-insecure-requests;

//     form-action 'self';

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

// // Clean up the string
// const cspValue = csp.replace(/\s+/g, " ").trim();

// // --- 5. DEFINE ALL SECURITY HEADERS ---
// const securityHeaders = [
//   // FIX: This structure is correct. The error must have been an external typo.
//   {
//     key: "Content-Security-Policy",
//     value: cspValue,
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
//     key: "Referrer-Policy",
//     value: "strict-origin-when-cross-origin",
//   },
//   {
//     key: "X-XSS-Protection",
//     value: "1; mode=block",
//   },
//   {
//     key: "X-Powered-By",
//     value: "",
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
//   swcMinify: false,
//   keySeparator: ".",
//   returnEmptyString: false,
//   reloadOnPrerender: isDev,
//   poweredByHeader: false,

//   async headers() {
//     return [
//       {
//         source: "/(.*)", // Ensure this is exactly "/(.*)" for all paths.
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

// --- 2. CSP SOURCE ARRAYS ---
let styleSources = [
  "'self'",
  "https://fonts.googleapis.com",
  "https://cdnjs.cloudflare.com",
  "https://stackpath.bootstrapcdn.com",
];

let scriptSources = [
  "'self'",
  "https://*.googleapis.com",
  "https://*.google.com",
  "https://www.googletagmanager.com",
];

let connectSources = [
  "'self'",
  // Make sure these match the production URLs from the .env file
  "https://api.fms.mobily.saferoad.net",
  "wss://socketio.fms.saferoad.net",
  "https://www.google-analytics.com",
  "https://*.googleapis.com",
  "https://*.google.com",
];

let imageSources = [
  "'self'",
  "data:",
  "blob:",
  "https://res.cloudinary.com",
  "https://*.googleapis.com",
  "https://*.gstatic.com",
];

let fontSources = [
  "'self'",
  "data:",
  "https://fonts.gstatic.com",
  "https://cdnjs.cloudflare.com",
  "https://stackpath.bootstrapcdn.com",
];

// --- 3. CONDITIONAL ADDITIONS FOR DEVELOPMENT (CRITICAL: MUST NOT BE IN PRODUCTION) ---
if (isDev) {
  // WARNING: These directives (unsafe-*) should NEVER be used in a production CSP.
  // They are necessary here to allow Next.js development-mode features (like HMR) to work.
  scriptSources.push("'unsafe-eval'");
  scriptSources.push("'unsafe-inline'");
  styleSources.push("'unsafe-inline'");
  connectSources.push("http:"); // Allow unsecure local connections
  connectSources.push("ws:"); // Allow unsecure websocket local connections
  imageSources.push("http:");
}

// --- 4. BUILD THE FINAL CSP STRING ---
// Enforce HTTPS with upgrade-insecure-requests
const csp = `
    default-src 'self';
    object-src 'none';
    base-uri 'self';
    frame-ancestors 'none';
    upgrade-insecure-requests;
    
    form-action 'self';

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

// Clean up the string
const cspValue = csp.replace(/\s+/g, " ").trim();

// --- 5. DEFINE ALL SECURITY HEADERS (Hardened) ---
const securityHeaders = [
  // 1. Content Security Policy (The main XSS defense)
  {
    key: "Content-Security-Policy",
    value: cspValue,
  },
  // 2. HTTP Strict Transport Security (HSTS) - Enforce HTTPS for 2 years
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  // 3. X-Frame-Options (Clickjacking defense)
  {
    key: "X-Frame-Options",
    value: "DENY",
  },
  // 4. X-Content-Type-Options (MIME-sniffing defense)
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  // 5. Referrer-Policy
  {
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin",
  },
  // 6. X-Powered-By (Information disclosure)
  {
    key: "X-Powered-By",
    value: "", // Clears the value
  },
  // 7. Permissions-Policy
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=()",
  },
  // NOTE: X-XSS-Protection has been removed as CSP is the superior modern defense.
];

// --- 6. NEXT.JS CONFIGURATION OBJECT ---
const nextConfig = {
  reactStrictMode: true,
  i18n,
  swcMinify: false,
  keySeparator: ".",
  returnEmptyString: false,
  reloadOnPrerender: isDev,
  poweredByHeader: false, // Prevents Next.js info leak

  async headers() {
    return [
      {
        source: "/(.*)", // Applies headers to all paths
        headers: securityHeaders,
      },
    ];
  },
};

module.exports = nextConfig;
