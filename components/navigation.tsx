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
  Home,
  Phone,
  Settings,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useMobile } from "@/hooks/use-mobile"
import { useAuth } from "@/contexts/auth-context"
import { cn } from "@/lib/utils"
import { LucideIcon } from "lucide-react"

type NavItem = {
  name: string;
  href: string;
  icon: LucideIcon;
}

export function Navigation() {
  const pathname = usePathname()
  const isMobile = useMobile()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { user, signOut } = useAuth()

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false)
  }, [pathname])

  const navItems: NavItem[] = [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: Home
    },
    { name: "Services", href: "/services", icon: Search },
    { name: "Bookings", href: "/bookings", icon: Calendar },
    { name: "Concierge", href: "/concierge", icon: MessageSquare },
    { name: "Contact", href: "/contact", icon: Phone },
    { name: "Settings", href: "/settings", icon: Settings },
  ]

  const secondaryNavItems: NavItem[] = [
    { name: "Profile", href: "/profile", icon: User },
    { name: "Notifications", href: "/notifications", icon: Bell },
    { name: "Receipts", href: "/receipts", icon: CreditCard },
    { name: "Add-ons", href: "/add-ons", icon: ShoppingCart },
  ]

  const renderNavItems = (items: NavItem[]) => (
    <ul className="space-y-2">
      {items.map((item) => (
        <li key={item.href}>
          <Link
            href={item.href}
            className={`flex items-center space-x-3 px-3 py-2 rounded-md transition-colors ${
              pathname === item.href ? "bg-primary text-primary-foreground" : "hover:bg-muted"
            }`}
          >
            <item.icon className="h-5 w-5" />
            <span>{item.name}</span>
          </Link>
        </li>
      ))}
    </ul>
  )

  // Mobile Navigation
  if (isMobile) {
    return (
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-background border-t md:hidden">
        <div className="container flex items-center justify-between p-2">
          {navItems.slice(0, 4).map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href

            return (
              <Link key={item.name} href={item.href}>
                <Button
                  variant="ghost"
                  size="sm"
                  className={cn(
                    "flex flex-col items-center gap-1 h-auto py-2",
                    isActive && "text-primary"
                  )}
                >
                  <Icon className="h-5 w-5" />
                  <span className="text-xs">{item.name}</span>
                </Button>
              </Link>
            )
          })}

          <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="sm" className="flex flex-col items-center gap-1 h-auto py-2">
                <Menu className="h-5 w-5" />
                <span className="text-xs">Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="bottom" className="h-[50vh]">
              <div className="grid grid-cols-3 gap-4 py-4">
                {navItems.map((item) => {
                  const Icon = item.icon
                  const isActive = pathname === item.href

                  return (
                    <Link key={item.name} href={item.href} onClick={() => setIsMenuOpen(false)}>
                      <Button
                        variant="ghost"
                        size="sm"
                        className={cn(
                          "w-full flex flex-col items-center gap-2 h-auto py-4",
                          isActive && "text-primary"
                        )}
                      >
                        <Icon className="h-6 w-6" />
                        <span className="text-sm">{item.name}</span>
                      </Button>
                    </Link>
                  )
                })}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
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

