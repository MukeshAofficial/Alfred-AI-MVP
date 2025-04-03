import type React from "react"
import { Navigation } from "@/components/navigation"
import { Header } from "@/components/header"
import ProtectedRoute from "@/components/auth/protected-route"

export default function GuestLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ProtectedRoute requiredRole="guest">
      <div className="flex flex-col min-h-screen">
        <Header />
        <div className="flex flex-1">
          <Navigation />
          <main className="flex-1 md:ml-64 pt-16 pb-20 md:pb-0">{children}</main>
        </div>
      </div>
    </ProtectedRoute>
  )
}

