import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

// ❗️.env ishlamaydi, shuning uchun hardcoded path ishlatamiz
const ADMIN_ROUTE = 'my-super-secret-dashboard-675';

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });

  const isAdmin = token?.role === 'admin';

  if (request.nextUrl.pathname.startsWith(`/${ADMIN_ROUTE}`) && !isAdmin) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [`/${ADMIN_ROUTE}/:path*`]  // ❗️ statik bo'lishi shart
};
