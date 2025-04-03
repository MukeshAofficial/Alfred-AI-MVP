"use client"

import { Hotel, User, Store } from "lucide-react"
import { Card, CardContent, CardDescription } from "@/components/ui/card"

interface RoleSelectorProps {
  onSelect: (role: string) => void
}

export function RoleSelector({ onSelect }: RoleSelectorProps) {
  const roles = [
    {
      id: "guest",
      name: "Guest",
      description: "Book rooms and services",
      icon: User,
    },
    {
      id: "hotel",
      name: "Hotel",
      description: "Manage your hotel",
      icon: Hotel,
    },
    {
      id: "vendor",
      name: "Vendor",
      description: "Offer services to hotels",
      icon: Store,
    },
  ]

  return (
    <div className="grid gap-4">
      <h3 className="text-center font-medium">Select your role</h3>
      <div className="grid gap-2">
        {roles.map((role) => (
          <Card
            key={role.id}
            className="cursor-pointer hover:bg-muted/50 transition-colors"
            onClick={() => onSelect(role.id)}
          >
            <CardContent className="p-4 flex items-center gap-4">
              <div className="bg-primary/10 p-2 rounded-full">
                <role.icon className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h4 className="font-medium">{role.name}</h4>
                <CardDescription>{role.description}</CardDescription>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

