import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

const SECRET_KEY =  new TextEncoder().encode(process.env.SECRET_KEY || 'UEBDJDJDJKLSLS');

export function middleware(req: NextRequest) {
  console.log("Middleware running for:", req.nextUrl.pathname);

  if (
    req.nextUrl.pathname === '/login' ||
    req.nextUrl.pathname === '/logout'
  ) {
    return NextResponse.next();
  }

  const token = req.cookies.get('token')?.value;

  // If no token found, redirect to login
  if (!token) {
    console.log("❌ No token found. Redirecting to login...");
    return NextResponse.redirect(new URL('/login', req.url));
  }

  try {
    const decoded = jwtVerify(token, SECRET_KEY);
    console.log("✅ Valid Token:", decoded);
    return NextResponse.next();
  } catch (error) {
    console.error("❌ Invalid Token:", error);
    const response = NextResponse.redirect(new URL('/login', req.url));
    response.cookies.delete('token');
    return response;
  }
}


export const config = {
  matcher: [
    '/adminabout',
    '/adminimages', 
    '/pdf',
    '/AddArticle',
    '/updatearticle',
    '/admin',
  ],
};