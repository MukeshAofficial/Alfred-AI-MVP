import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { createServerClient } from "@supabase/ssr"

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value
        },
        set(name: string, value: string, options: any) {
          request.cookies.set({
            name,
            value,
            ...options,
          })
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          })
          response.cookies.set({
            name,
            value,
            ...options,
          })
        },
        remove(name: string, options: any) {
          request.cookies.set({
            name,
            value: "",
            ...options,
          })
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          })
          response.cookies.set({
            name,
            value: "",
            ...options,
          })
        },
      },
    },
  )

  const {
    data: { session },
  } = await supabase.auth.getSession()

  // Protected routes that require authentication
  const protectedRoutes = [
    "/admin/dashboard",
    "/admin/bookings",
    "/admin/rooms",
    "/admin/staff",
    "/admin/restaurant",
    "/admin/spa",
    "/vendor/dashboard",
    "/vendor/services",
    "/vendor/bookings",
    "/vendor/earnings",
    "/vendor/reviews",
    "/vendor/settings",
    "/profile",
    "/bookings",
    "/receipts",
  ]

  // Check if the current path is a protected route
  const isProtectedRoute = protectedRoutes.some((route) => request.nextUrl.pathname.startsWith(route))

  // If it's a protected route and there's no session, redirect to login
  if (isProtectedRoute && !session) {
    return NextResponse.redirect(new URL("/auth", request.url))
  }

  // Role-specific route protection
  if (session) {
    const { data: user } = await supabase.from("profiles").select("role").eq("id", session.user.id).single()

    // Admin routes
    if (request.nextUrl.pathname.startsWith("/admin") && user?.role !== "hotel") {
      return NextResponse.redirect(new URL("/", request.url))
    }

    // Vendor routes
    if (request.nextUrl.pathname.startsWith("/vendor") && user?.role !== "vendor") {
      return NextResponse.redirect(new URL("/", request.url))
    }
  }

  return response
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public (public files)
     */
    "/((?!_next/static|_next/image|favicon.ico|public).*)",
  ],
}

