"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { Loader2 } from "lucide-react"

interface ProtectedRouteProps {
  children: React.ReactNode
  requiredRole?: "guest" | "hotel" | "vendor"
}

export default function ProtectedRoute({ children, requiredRole }: ProtectedRouteProps) {
  const { user, isLoading, userRole } = useAuth()
  const router = useRouter()
  const pathname = usePathname()
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null)

  useEffect(() => {
    if (!isLoading) {
      if (!user) {
        router.push(`/auth?redirect=${encodeURIComponent(pathname)}`)
        setIsAuthorized(false)
      } else if (requiredRole && userRole !== requiredRole) {
        // Redirect based on actual role
        if (userRole === "guest") {
          router.push("/explore")
        } else if (userRole === "hotel") {
          router.push("/admin/dashboard")
        } else if (userRole === "vendor") {
          router.push("/vendor/dashboard")
        } else {
          router.push("/")
        }
        setIsAuthorized(false)
      } else {
        setIsAuthorized(true)
      }
    }
  }, [user, isLoading, router, pathname, requiredRole, userRole])

  if (isLoading || isAuthorized === null) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  if (isAuthorized) {
    return <>{children}</>
  }

  return null
}

