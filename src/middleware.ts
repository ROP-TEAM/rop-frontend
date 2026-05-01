import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

//login can access
const protectRoutes = ["/ksdk"];
//not login can access
const authRoutes = ["/haha"];
export const middleware = async (req: NextRequest) => {
  let token = await getToken({
    req,
  });
  const isExpired =
    typeof token?.exp === "string" || typeof token?.exp === "number"
      ? Date.now() >= new Date(token.exp).getTime()
      : false;
  const { pathname } = req.nextUrl;
  const isProtectRoute = protectRoutes.some((route) =>
    pathname.startsWith(route),
  );
  const isAuthRoute = authRoutes.some((route) => pathname.startsWith(route));
  if (isExpired) {
    token = null;
  }
  if (isProtectRoute && !token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }
  if (token && token.backendError) {
    return NextResponse.redirect(new URL("/login", req.url));
  }
  if (isAuthRoute && token) {
    return NextResponse.redirect(new URL("/isProtect", req.url));
  }
  if (token && token.needOnboarding && pathname !== "/onboarding") {
    return NextResponse.redirect(new URL("/onboarding", req.url));
  }
  if (token && !token.needOnboarding && pathname == "/onboarding") {
    return NextResponse.redirect(new URL("/isProtect", req.url));
  }
  return NextResponse.next();
};
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|public).*)"],
};
