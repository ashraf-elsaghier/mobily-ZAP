// middleware.js

import { NextResponse } from "next/server";
import { Buffer } from "buffer";

// Helper function to generate a strong, base64-encoded nonce
function generateNonce() {
  // Use crypto.randomUUID for a strong, unique identifier per request
  return Buffer.from(crypto.randomUUID()).toString("base64");
}

export function middleware(request) {
  const nonce = generateNonce();
  const isDev = process.env.NODE_ENV === "development";

  // --- 1. DEFINE YOUR STRICT CSP HEADER ---
  // IMPORTANT: 'unsafe-inline' is REMOVED from script-src and style-src
  // The 'nonce-...' value is added instead.

  const cspHeader = `
    default-src 'self';
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    frame-ancestors 'self';
    upgrade-insecure-requests;

    script-src 'self' 'nonce-${nonce}' 
      https://*.googleapis.com 
      https://*.google.com 
      https://www.googletagmanager.com 
      https://maps.googleapis.com 
      https://maps.gstatic.com
      ${isDev ? "'unsafe-eval'" : ""}; // Required for Next.js development mode

    style-src 'self' 'nonce-${nonce}' 
      https://fonts.googleapis.com 
      https://cdnjs.cloudflare.com 
      https://stackpath.bootstrapcdn.com 
      https://css.zohocdn.com;

    style-src-elem 'self' 'nonce-${nonce}' 
      https://fonts.googleapis.com 
      https://cdnjs.cloudflare.com 
      https://stackpath.bootstrapcdn.com 
      https://css.zohocdn.com;

    img-src 'self' data: blob: 
      https://res.cloudinary.com 
      https://*.googleapis.com 
      https://*.gstatic.com 
      https://maps.googleapis.com 
      https://maps.gstatic.com;
      
    connect-src 'self' 
      https://api.fms.mobily.saferoad.net 
      wss://socketio.fms.mobily.saferoad.net 
      wss://socketio.fms.saferoad.net 
      https://www.google-analytics.com 
      https://*.googleapis.com 
      https://*.google.com 
      https://maps.googleapis.com 
      https://maps.gstatic.com;
      
    font-src 'self' data: 
      https://fonts.gstatic.com 
      https://cdnjs.cloudflare.com 
      https://stackpath.bootstrapcdn.com 
      https://css.zohocdn.com;
      
    frame-src 'self' https://*.google.com;
    worker-src 'self' blob:;
    child-src 'self' blob:;
    
  `
    .replace(/\s{2,}/g, " ")
    .trim(); // Remove newlines and extra spaces

  const response = NextResponse.next();

  // 2. Set the CSP header in the RESPONSE for the browser to enforce
  response.headers.set("Content-Security-Policy", cspHeader);

  // 3. Set a custom header (X-Nonce) in the RESPONSE so _document.js can read the nonce
  // Note: While you originally tried cookies, setting a custom response header is a common pattern for Next.js Pages Router
  response.headers.set("X-Nonce", nonce);

  return response;
}

// 4. Configure matcher to skip static assets and speed up build/requests
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
