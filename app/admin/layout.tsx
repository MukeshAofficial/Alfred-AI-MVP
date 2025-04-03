import type React from "react"
import { AdminNavigation } from "@/components/admin/admin-navigation"
import ProtectedRoute from "@/components/auth/protected-route"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ProtectedRoute requiredRole="hotel">
      <div className="flex min-h-screen">
        <AdminNavigation />
        <main className="flex-1 p-6 md:ml-64">{children}</main>
      </div>
    </ProtectedRoute>
  )
}

