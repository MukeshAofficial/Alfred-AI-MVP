import type React from "react"
import ProtectedRoute from "@/components/auth/protected-route"

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ProtectedRoute requiredRole="guest">
      <div className="flex min-h-screen bg-gray-50">
        <div className="flex-1 w-full">
          {children}
        </div>
      </div>
    </ProtectedRoute>
  )
} 