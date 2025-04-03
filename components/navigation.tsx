"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Bell,
  Calendar,
  ChefHat,
  CreditCard,
  Menu,
  MessageSquare,
  Package,
  Search,
  ShoppingCart,
  User,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useMobile } from "@/hooks/use-mobile"
import { useAuth } from "@/contexts/auth-context"

export function Navigation() {
  const pathname = usePathname()
  const isMobile = useMobile()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { user, signOut } = useAuth()

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false)
  }, [pathname])

  const navItems = [
    { href: "/explore", label: "Explore", icon: <Search className="h-5 w-5" /> },
    { href: "/services", label: "Services", icon: <Package className="h-5 w-5" /> },
    { href: "/restaurants", label: "Dining", icon: <ChefHat className="h-5 w-5" /> },
    { href: "/bookings", label: "Bookings", icon: <Calendar className="h-5 w-5" /> },
    { href: "/concierge", label: "Concierge", icon: <MessageSquare className="h-5 w-5" /> },
  ]

  const secondaryNavItems = [
    { href: "/profile", label: "Profile", icon: <User className="h-5 w-5" /> },
    { href: "/notifications", label: "Notifications", icon: <Bell className="h-5 w-5" /> },
    { href: "/receipts", label: "Receipts", icon: <CreditCard className="h-5 w-5" /> },
    { href: "/add-ons", label: "Add-ons", icon: <ShoppingCart className="h-5 w-5" /> },
  ]

  const renderNavItems = (items: typeof navItems) => (
    <ul className="space-y-2">
      {items.map((item) => (
        <li key={item.href}>
          <Link
            href={item.href}
            className={`flex items-center space-x-3 px-3 py-2 rounded-md transition-colors ${
              pathname === item.href ? "bg-primary text-primary-foreground" : "hover:bg-muted"
            }`}
          >
            {item.icon}
            <span>{item.label}</span>
          </Link>
        </li>
      ))}
    </ul>
  )

  // Mobile Navigation
  if (isMobile) {
    return (
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-background border-t p-2">
        <div className="flex justify-around items-center">
          <Link
            href="/explore"
            className={`flex flex-col items-center p-2 ${
              pathname === "/explore" ? "text-primary" : "text-muted-foreground"
            }`}
          >
            <Search className="h-5 w-5" />
            <span className="text-xs mt-1">Explore</span>
          </Link>
          <Link
            href="/services"
            className={`flex flex-col items-center p-2 ${
              pathname === "/services" ? "text-primary" : "text-muted-foreground"
            }`}
          >
            <Package className="h-5 w-5" />
            <span className="text-xs mt-1">Services</span>
          </Link>
          <Link
            href="/concierge"
            className={`flex flex-col items-center p-2 ${
              pathname === "/concierge" ? "text-primary" : "text-muted-foreground"
            }`}
          >
            <MessageSquare className="h-5 w-5" />
            <span className="text-xs mt-1">Concierge</span>
          </Link>
          <Link
            href="/bookings"
            className={`flex flex-col items-center p-2 ${
              pathname === "/bookings" ? "text-primary" : "text-muted-foreground"
            }`}
          >
            <Calendar className="h-5 w-5" />
            <span className="text-xs mt-1">Bookings</span>
          </Link>

          <Sheet>
            <SheetTrigger asChild>
              <button className="flex flex-col items-center p-2 text-muted-foreground">
                <Menu className="h-5 w-5" />
                <span className="text-xs mt-1">Menu</span>
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[80%] sm:w-[350px]">
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between py-4 border-b">
                  <Link href="/" className="flex items-center space-x-2">
                    <span className="font-bold text-xl">AI Butler</span>
                  </Link>
                </div>

                <div className="flex-1 overflow-auto py-4 space-y-6">
                  {renderNavItems(navItems)}

                  <div className="border-t pt-4">{renderNavItems(secondaryNavItems)}</div>
                </div>

                <div className="border-t pt-4 pb-2">
                  {user ? (
                    <Button variant="outline" className="w-full" onClick={signOut}>
                      Sign Out
                    </Button>
                  ) : (
                    <Link href="/auth">
                      <Button className="w-full">Sign In</Button>
                    </Link>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    )
  }

  // Desktop Navigation
  return (
    <div className="fixed top-0 left-0 bottom-0 w-64 border-r bg-background z-40 flex flex-col">
      <div className="p-4 border-b">
        <Link href="/" className="flex items-center space-x-2">
          <span className="font-bold text-xl">AI Butler</span>
        </Link>
      </div>

      <div className="flex-1 overflow-auto p-4 space-y-6">
        {renderNavItems(navItems)}

        <div className="border-t pt-4">{renderNavItems(secondaryNavItems)}</div>
      </div>

      <div className="p-4 border-t">
        {user ? (
          <Button variant="outline" className="w-full" onClick={signOut}>
            Sign Out
          </Button>
        ) : (
          <Link href="/auth">
            <Button className="w-full">Sign In</Button>
          </Link>
        )}
      </div>
    </div>
  )
}

