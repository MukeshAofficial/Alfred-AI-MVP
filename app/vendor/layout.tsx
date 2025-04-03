import type React from "react"
import VendorNavigation from "@/components/vendor/vendor-navigation"
import ProtectedRoute from "@/components/auth/protected-route"
import { ThemeProvider } from "@/components/theme-provider"

export default function VendorLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <ProtectedRoute requiredRole="vendor">
        <div className="flex min-h-screen flex-col">
          <VendorNavigation />
          <main className="flex-1 p-6">{children}</main>
        </div>
      </ProtectedRoute>
    </ThemeProvider>
  )
}

