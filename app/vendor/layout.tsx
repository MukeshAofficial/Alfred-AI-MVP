import type React from "react"
import VendorNavigation from "@/components/vendor/vendor-navigation"
import ProtectedRoute from "@/components/auth/protected-route"

export default function VendorLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ProtectedRoute requiredRole="vendor">
      <div className="flex min-h-screen bg-gray-50">
        <VendorNavigation />
        <div className="flex-1 w-full md:ml-64">
          <main className="container mx-auto px-4 py-8">
            {children}
          </main>
        </div>
      </div>
    </ProtectedRoute>
  )
}

