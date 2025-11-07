const { i18n } = require("./next-i18next.config");

const isProd = process.env.NODE_ENV === "production";
const isDev = !isProd;

const styleSources = [
  "'self'",
  "'unsafe-inline'",
  "https://fonts.googleapis.com",
  "https://cdnjs.cloudflare.com",
  "https://stackpath.bootstrapcdn.com",
  "https://css.zohocdn.com",
];

const scriptSources = [
  "'self'",
  "'unsafe-inline'",
  "https://*.googleapis.com",
  "https://*.google.com",
  "https://www.googletagmanager.com",
  "https://maps.googleapis.com",
  "https://maps.gstatic.com",
];

const connectSources = [
  "'self'",
  "https://api.fms.mobily.saferoad.net",
  "wss://socketio.fms.mobily.saferoad.net",
  "wss://socketio.fms.saferoad.net",
  "https://www.google-analytics.com",
  "https://*.googleapis.com",
  "https://*.google.com",
  "https://maps.googleapis.com",
  "https://maps.gstatic.com",
];

const imageSources = [
  "'self'",
  "data:",
  "blob:",
  "https://res.cloudinary.com",
  "https://*.googleapis.com",
  "https://*.gstatic.com",
  "https://maps.googleapis.com",
  "https://maps.gstatic.com",
];

const fontSources = [
  "'self'",
  "data:",
  "https://fonts.gstatic.com",
  "https://cdnjs.cloudflare.com",
  "https://stackpath.bootstrapcdn.com",
  "https://css.zohocdn.com",
];

if (isDev) {
  scriptSources.push("'unsafe-eval'");
  scriptSources.push("'unsafe-inline'");
  styleSources.push("'unsafe-inline'");
  connectSources.push("http:");
  connectSources.push("ws:");
  imageSources.push("http:");
} else {
  scriptSources.push("'sha256-7Ayf/i8gH+ASideztFT+YbgRd62nZdTXp4RbP3P4hjk='");
}

const csp = `
  default-src 'self';
  object-src 'none';
  base-uri 'self';
  frame-ancestors 'self';
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

const securityHeaders = [
  {
    key: "Content-Security-Policy",
    value: csp.replace(/\s+/g, " ").trim(),
  },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-XSS-Protection", value: "1; mode=block" },
  { key: "X-Powered-By", value: "" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=()",
  },
  { key: "Cross-Origin-Embedder-Policy", value: "unsafe-none" },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin-allow-popups" },
];

const nextConfig = {
  reactStrictMode: true,
  i18n,
  swcMinify: false,
  keySeparator: ".",
  returnEmptyString: false,
  reloadOnPrerender: isDev,
  poweredByHeader: false,
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
