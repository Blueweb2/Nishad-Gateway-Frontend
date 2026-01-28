// import { NextRequest, NextResponse } from "next/server";

// export function middleware(req: NextRequest) {
//   const { pathname } = req.nextUrl;

//   const access = req.cookies.get("admin_access_token")?.value;
//   const refresh = req.cookies.get("admin_refresh_token")?.value;

//   // if no tokens -> block all admin pages except login
//   if (!access && !refresh && pathname.startsWith("/admin") && pathname !== "/admin/login") {
//     const url = req.nextUrl.clone();
//     url.pathname = "/admin/login";
//     return NextResponse.redirect(url);
//   }

//   // if token exists -> prevent opening login page
//   if ((access || refresh) && pathname === "/admin/login") {
//     const url = req.nextUrl.clone();
//     url.pathname = "/admin/dashboard";
//     return NextResponse.redirect(url);
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: ["/admin/:path*"],
// };






import { log } from "console";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;



  const access = req.cookies.get("admin_access_token");

  console.log("this is access",access);
  

  // allow login page
  if (pathname === "/admin/login") {
    return NextResponse.next();
  }

  // protect admin routes
  if (!access && pathname.startsWith("/admin")) {
    const url = req.nextUrl.clone();
    url.pathname = "/admin/login";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
