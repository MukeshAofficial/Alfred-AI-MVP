import type React from "react"
import AdminNavigation from "@/components/admin/admin-navigation"
import ProtectedRoute from "@/components/auth/protected-route"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ProtectedRoute requiredRole="hotel">
      <div className="flex min-h-screen bg-gray-50">
        <div className="fixed top-0 left-0 z-40">
          <AdminNavigation />
        </div>
        <div className="flex-1 w-full md:pl-64">
          <main className="container mx-auto px-4 py-8">
            {children}
          </main>
        </div>
      </div>
    </ProtectedRoute>
  )
}

