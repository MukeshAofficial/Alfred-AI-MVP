"use client"

import { useEffect, useState } from "react"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Building2, Mail, Phone, MapPin, Globe, Edit } from "lucide-react"

interface VendorProfile {
  business_name: string
  service_type: string
  description: string
  address: string
  city: string
  state: string
  country: string
  postal_code: string
  phone: string
  email: string
  website: string | null
  is_approved: boolean
  created_at: string
}

export default function VendorProfilePage() {
  const [profile, setProfile] = useState<VendorProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const supabase = createClientComponentClient()

  useEffect(() => {
    async function loadProfile() {
      try {
        const { data: { user } } = await supabase.auth.getUser()
        if (!user) return

        const { data: vendorData, error } = await supabase
          .from('vendors')
          .select('*')
          .eq('profile_id', user.id)
          .single()

        if (error) throw error
        setProfile(vendorData)
      } catch (error) {
        console.error('Error loading vendor profile:', error)
      } finally {
        setLoading(false)
      }
    }

    loadProfile()
  }, [supabase])

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>
  }

  if (!profile) {
    return <div className="flex items-center justify-center min-h-screen">No profile found</div>
  }

  return (
    <div className="max-w-4xl mx-auto py-8">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Vendor Profile</CardTitle>
            <CardDescription>Your business information and settings</CardDescription>
          </div>
          <Button variant="outline" className="flex items-center gap-2">
            <Edit className="h-4 w-4" />
            Edit Profile
          </Button>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Building2 className="h-4 w-4" />
                <span className="text-sm">Business Name</span>
              </div>
              <p className="font-medium">{profile.business_name}</p>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2 text-muted-foreground">
                <span className="text-sm">Service Type</span>
              </div>
              <p className="font-medium capitalize">{profile.service_type}</p>
            </div>

            <div className="space-y-1 md:col-span-2">
              <div className="flex items-center gap-2 text-muted-foreground">
                <span className="text-sm">Description</span>
              </div>
              <p>{profile.description}</p>
            </div>

            <div className="space-y-1 md:col-span-2">
              <div className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span className="text-sm">Address</span>
              </div>
              <p>{profile.address}</p>
              <p>{`${profile.city}, ${profile.state} ${profile.postal_code}`}</p>
              <p>{profile.country}</p>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Phone className="h-4 w-4" />
                <span className="text-sm">Phone</span>
              </div>
              <p>{profile.phone}</p>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Mail className="h-4 w-4" />
                <span className="text-sm">Email</span>
              </div>
              <p>{profile.email}</p>
            </div>

            {profile.website && (
              <div className="space-y-1 md:col-span-2">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Globe className="h-4 w-4" />
                  <span className="text-sm">Website</span>
                </div>
                <a href={profile.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                  {profile.website}
                </a>
              </div>
            )}

            <div className="md:col-span-2 pt-4 border-t">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Account Status</p>
                  <p className={`font-medium ${profile.is_approved ? 'text-green-600' : 'text-amber-600'}`}>
                    {profile.is_approved ? 'Approved' : 'Pending Approval'}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">Member Since</p>
                  <p className="font-medium">
                    {new Date(profile.created_at).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 