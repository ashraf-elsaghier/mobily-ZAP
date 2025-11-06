import { NextResponse } from "next/server";

export function middleware(request) {
  const response = NextResponse.next();

  // Ensure anti-clickjacking header is present on ALL responses, including redirects
  response.headers.set("X-Frame-Options", "SAMEORIGIN");

  // Do not set CSP here to avoid duplicating the header already defined in next.config.js
  // If you prefer CSP instead of X-Frame-Options, replace the line above with:
  // response.headers.set('Content-Security-Policy', "frame-ancestors 'self'");

  return response;
}

// Apply to all paths
export const config = {
  matcher: "/:path*",
};
