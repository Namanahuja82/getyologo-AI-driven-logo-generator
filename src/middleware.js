// middleware.js
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';

const publicRoutes = ['/sign-in', '/sign-up', '/', '/features', '/testimonials'];

export async function middleware(req) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });
  
  // Check auth status
  const { data: { session } } = await supabase.auth.getSession();
  
  // Check if the current route is a public route
  const isPublicRoute = publicRoutes.some(route => 
    req.nextUrl.pathname === route || req.nextUrl.pathname.startsWith(route + '/')
  );
  
  // Redirect unauthenticated users to sign-in
  if (!session && !isPublicRoute) {
    const redirectUrl = new URL('/sign-in', req.url);
    return NextResponse.redirect(redirectUrl);
  }
  
  return res;
}

export const config = {
  matcher: [
    '/((?!_next|api/auth|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/api/logogen',
  ],
};