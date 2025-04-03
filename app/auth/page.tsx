"use client"

import { useState } from "react"
import { useSearchParams } from "next/navigation"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { LoginForm } from "@/components/auth/login-form"
import { RegisterForm } from "@/components/auth/register-form"
import { RoleSelector } from "@/components/auth/role-selector"

export default function AuthPage() {
  const searchParams = useSearchParams()
  const defaultTab = searchParams.get("tab") || "login"
  const [tab, setTab] = useState<string>(defaultTab)
  const [selectedRole, setSelectedRole] = useState<string | null>(null)

  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px] md:w-[450px]">
        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center">{tab === "login" ? "Sign in" : "Create an account"}</CardTitle>
            <CardDescription className="text-center">
              {tab === "login"
                ? "Enter your credentials to sign in to your account"
                : "Enter your information to create your account"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={tab} onValueChange={setTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="register">Register</TabsTrigger>
              </TabsList>

              <TabsContent value="login" className="mt-4">
                {!selectedRole ? (
                  <RoleSelector onSelect={setSelectedRole} />
                ) : (
                  <LoginForm role={selectedRole} onRoleChange={() => setSelectedRole(null)} />
                )}
              </TabsContent>

              <TabsContent value="register" className="mt-4">
                {!selectedRole ? (
                  <RoleSelector onSelect={setSelectedRole} />
                ) : (
                  <RegisterForm role={selectedRole} onRoleChange={() => setSelectedRole(null)} />
                )}
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <div className="text-sm text-center text-muted-foreground">
              By continuing, you agree to our{" "}
              <a href="/terms" className="underline underline-offset-4 hover:text-primary">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="/privacy" className="underline underline-offset-4 hover:text-primary">
                Privacy Policy
              </a>
              .
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

