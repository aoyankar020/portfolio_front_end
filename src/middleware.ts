import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const { nextUrl, nextauth } = req;
    const token = nextauth?.token;

    // 1️⃣ Handle protected dashboard routes
    if (nextUrl.pathname.startsWith("/dashboard")) {
      if (!token) {
        // Redirect unauthenticated users to login page
        const loginUrl = new URL("/login", req.url);
        loginUrl.searchParams.set("callbackUrl", nextUrl.pathname); // Optional: redirect back after login
        return NextResponse.redirect(loginUrl);
      }
    }

    // 2️⃣ Prevent logged-in users from visiting login/register
    if (
      token &&
      (nextUrl.pathname === "/login" || nextUrl.pathname === "/register")
    ) {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }

    // 3️⃣ Allow all other requests
    return NextResponse.next();
  },
  {
    callbacks: {
      // If a token exists, user is authenticated
      authorized: ({ token }) => true, // Always true to handle logic manually above
    },
  }
);

export const config = {
  matcher: ["/dashboard/:path*", "/login", "/register"],
};
