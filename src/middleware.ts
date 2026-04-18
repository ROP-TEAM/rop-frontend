import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

//login can access
const protectRoutes = ["/isProtect"];
//not login can access
const authRoutes = ["/login"];
export const middleware = async (req: NextRequest) => {
  const token = await getToken({
    req,
  });
  const { pathname } = req.nextUrl;
  const isProtectRoute = protectRoutes.some((route) =>
    pathname.startsWith(route),
  );
  const isAuthRoute = authRoutes.some((route) => pathname.startsWith(route));
  if (isProtectRoute && !token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }
  if (isAuthRoute && token) {
    return NextResponse.redirect(new URL("/isProtect", req.url));
  }
  return NextResponse.next();
};
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|public).*)"],
};
