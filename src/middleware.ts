import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

//login can access
const protectRoutes = ["/onboarding"];
//not login can access
const authRoutes = ["/login"];

function decodeJwt(token: string) {
  const base64Url = token.split(".")[1];
  const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");

  return JSON.parse(Buffer.from(base64, "base64").toString());
}

export const middleware = async (req: NextRequest) => {
  let token = await getToken({
    req,
  });
  let isExpired = false;
  const backendToken = token?.backendToken as string;
  try {
    const paylod = decodeJwt(backendToken);
    isExpired = Date.now() >= paylod.exp * 1000;
  } catch {
    isExpired = true;
  }
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
