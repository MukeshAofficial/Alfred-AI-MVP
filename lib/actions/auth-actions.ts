"use server"
import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"

export async function login(email: string, password: string, role: string) {
  const supabase = createClient()

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    return { error: error.message }
  }

  // Check if user has the correct role
  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", data.user.id)
    .single()

  if (profileError) {
    return { error: "Failed to fetch user profile" }
  }

  if (profile.role !== role) {
    // Sign out if role doesn't match
    await supabase.auth.signOut()
    return { error: `You are not registered as a ${role}. Please sign in with the correct account.` }
  }

  return { success: true, user: data.user }
}

export async function register(name: string, email: string, password: string, role: string) {
  const supabase = createClient()

  // Create the user in Auth
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        name,
        role,
      },
    },
  })

  if (error) {
    return { error: error.message }
  }

  // Create the profile record
  const { error: profileError } = await supabase.from("profiles").insert({
    id: data.user?.id,
    name,
    email,
    role,
  })

  if (profileError) {
    return { error: "Failed to create user profile" }
  }

  return { success: true, user: data.user }
}

export async function logout() {
  const supabase = createClient()
  await supabase.auth.signOut()
  redirect("/")
}

export async function getSession() {
  const supabase = createClient()
  const {
    data: { session },
  } = await supabase.auth.getSession()
  return session
}

export async function getUserProfile() {
  const supabase = createClient()
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    return null
  }

  const { data, error } = await supabase.from("profiles").select("*").eq("id", session.user.id).single()

  if (error) {
    return null
  }

  return data
}

