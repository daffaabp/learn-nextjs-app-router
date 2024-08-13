import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {

  const isLogin = false;
  // setiap kita mengakses sebuah URL, maka yang diakses adalah middleware nya terlebih dahulu 

  if (!isLogin) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config = {
  matcher : ["/dashboard/:path*", "/about/:path*"]  ,
}