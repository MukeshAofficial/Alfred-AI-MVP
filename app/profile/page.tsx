"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import {
  User,
  Settings,
  CreditCard,
  LogOut,
  Calendar,
  ChevronRight,
  Edit,
  Camera,
  Shield,
  Globe,
  Moon,
  Sun,
  Smartphone,
} from "lucide-react"
import Header from "@/components/header"
import Navigation from "@/components/navigation"
import { useMobile } from "@/hooks/use-mobile"
import { cn } from "@/lib/utils"

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("profile")
  const isMobile = useMobile()
  const [theme, setTheme] = useState("light")

  // Mock user data
  const userData = {
    name: "John Smith",
    email: "john.smith@example.com",
    phone: "+1 (555) 123-4567",
    roomNumber: "Suite 402",
    checkIn: "May 12, 2023",
    checkOut: "May 19, 2023",
    loyaltyPoints: 2450,
    loyaltyTier: "Gold",
    profileImage: "/placeholder.svg?height=100&width=100",
    preferences: {
      roomTemperature: "72°F",
      pillowType: "Memory Foam",
      dietaryRestrictions: "None",
      wakeUpCalls: "No",
      newspaperDelivery: "Yes - The New York Times",
      language: "English",
      currency: "USD",
    },
    paymentMethods: [
      {
        id: "card1",
        type: "Visa",
        last4: "4242",
        expiry: "05/25",
        isDefault: true,
      },
      {
        id: "card2",
        type: "Mastercard",
        last4: "8888",
        expiry: "09/24",
        isDefault: false,
      },
    ],
    recentActivity: [
      {
        id: "act1",
        type: "booking",
        title: "Spa Appointment",
        date: "Today, 10:30 AM",
      },
      {
        id: "act2",
        type: "order",
        title: "Room Service Order",
        date: "Yesterday, 8:15 PM",
      },
      {
        id: "act3",
        type: "request",
        title: "Extra Towels Request",
        date: "May 14, 2023",
      },
    ],
  }

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light")
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header title="My Profile" showNotification />

      <div className={cn("container mx-auto px-4 py-6 flex-1", isMobile ? "pb-20" : "")}>
        <div className="flex flex-col md:flex-row gap-6">
          {/* Profile Summary */}
          <div className="w-full md:w-1/3">
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center">
                  <div className="relative">
                    <Avatar className="h-24 w-24 mb-4">
                      <AvatarImage src={userData.profileImage} alt={userData.name} />
                      <AvatarFallback>{userData.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <Button variant="secondary" size="icon" className="absolute bottom-3 right-0 rounded-full h-8 w-8">
                      <Camera className="h-4 w-4" />
                    </Button>
                  </div>
                  <h2 className="text-xl font-bold">{userData.name}</h2>
                  <p className="text-muted-foreground mb-2">{userData.email}</p>
                  <Badge className="mb-4">{userData.loyaltyTier} Member</Badge>

                  <div className="w-full bg-muted rounded-full h-2.5 mb-1">
                    <div className="bg-primary h-2.5 rounded-full" style={{ width: "65%" }}></div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-6">
                    {userData.loyaltyPoints} points • 550 points to Platinum
                  </p>

                  <div className="w-full space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Room:</span>
                      <span className="font-medium">{userData.roomNumber}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Check-in:</span>
                      <span className="font-medium">{userData.checkIn}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Check-out:</span>
                      <span className="font-medium">{userData.checkOut}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Desktop Navigation */}
            {!isMobile && (
              <Card className="mt-6">
                <CardContent className="p-0">
                  <div className="divide-y">
                    <Button
                      variant="ghost"
                      className={cn(
                        "w-full justify-start rounded-none h-12",
                        activeTab === "profile" && "bg-primary/10 text-primary",
                      )}
                      onClick={() => setActiveTab("profile")}
                    >
                      <User className="mr-2 h-4 w-4" />
                      Personal Information
                    </Button>
                    <Button
                      variant="ghost"
                      className={cn(
                        "w-full justify-start rounded-none h-12",
                        activeTab === "preferences" && "bg-primary/10 text-primary",
                      )}
                      onClick={() => setActiveTab("preferences")}
                    >
                      <Settings className="mr-2 h-4 w-4" />
                      Preferences
                    </Button>
                    <Button
                      variant="ghost"
                      className={cn(
                        "w-full justify-start rounded-none h-12",
                        activeTab === "payment" && "bg-primary/10 text-primary",
                      )}
                      onClick={() => setActiveTab("payment")}
                    >
                      <CreditCard className="mr-2 h-4 w-4" />
                      Payment Methods
                    </Button>
                    <Button
                      variant="ghost"
                      className={cn(
                        "w-full justify-start rounded-none h-12",
                        activeTab === "bookings" && "bg-primary/10 text-primary",
                      )}
                      onClick={() => setActiveTab("bookings")}
                    >
                      <Calendar className="mr-2 h-4 w-4" />
                      My Bookings
                    </Button>
                    <Button
                      variant="ghost"
                      className={cn(
                        "w-full justify-start rounded-none h-12",
                        activeTab === "security" && "bg-primary/10 text-primary",
                      )}
                      onClick={() => setActiveTab("security")}
                    >
                      <Shield className="mr-2 h-4 w-4" />
                      Security
                    </Button>
                    <Button variant="ghost" className="w-full justify-start rounded-none h-12 text-destructive">
                      <LogOut className="mr-2 h-4 w-4" />
                      Sign Out
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Main Content */}
          <div className="w-full md:w-2/3">
            {isMobile ? (
              <Tabs defaultValue="profile">
                <TabsList className="w-full grid grid-cols-4 mb-6">
                  <TabsTrigger value="profile">Profile</TabsTrigger>
                  <TabsTrigger value="preferences">Preferences</TabsTrigger>
                  <TabsTrigger value="payment">Payment</TabsTrigger>
                  <TabsTrigger value="security">Security</TabsTrigger>
                </TabsList>

                <TabsContent value="profile">
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                      <div>
                        <CardTitle>Personal Information</CardTitle>
                        <CardDescription>Manage your personal details and contact information</CardDescription>
                      </div>
                      <Button variant="ghost" size="icon">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input id="name" defaultValue={userData.name} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" defaultValue={userData.email} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone</Label>
                        <Input id="phone" type="tel" defaultValue={userData.phone} />
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button>Save Changes</Button>
                    </CardFooter>
                  </Card>

                  <Card className="mt-6">
                    <CardHeader>
                      <CardTitle>Recent Activity</CardTitle>
                      <CardDescription>Your recent interactions and bookings</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {userData.recentActivity.map((activity) => (
                          <div
                            key={activity.id}
                            className="flex justify-between items-center border-b pb-3 last:border-0 last:pb-0"
                          >
                            <div>
                              <p className="font-medium">{activity.title}</p>
                              <p className="text-sm text-muted-foreground">{activity.date}</p>
                            </div>
                            <Button variant="ghost" size="sm">
                              <ChevronRight className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="preferences">
                  <Card>
                    <CardHeader>
                      <CardTitle>Stay Preferences</CardTitle>
                      <CardDescription>Customize your stay experience</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="temperature">Room Temperature</Label>
                        <Input id="temperature" defaultValue={userData.preferences.roomTemperature} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="pillow">Pillow Type</Label>
                        <select id="pillow" className="w-full p-2 border rounded">
                          <option>Memory Foam</option>
                          <option>Feather</option>
                          <option>Firm</option>
                          <option>Soft</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="dietary">Dietary Restrictions</Label>
                        <Input id="dietary" defaultValue={userData.preferences.dietaryRestrictions} />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="wakeup">Wake-up Calls</Label>
                        <Switch id="wakeup" defaultChecked={userData.preferences.wakeUpCalls === "Yes"} />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="newspaper">Newspaper Delivery</Label>
                        <Switch
                          id="newspaper"
                          defaultChecked={userData.preferences.newspaperDelivery.startsWith("Yes")}
                        />
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="mt-6">
                    <CardHeader>
                      <CardTitle>App Preferences</CardTitle>
                      <CardDescription>Customize your app experience</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="language">Language</Label>
                        <select id="language" className="w-full p-2 border rounded">
                          <option>English</option>
                          <option>Spanish</option>
                          <option>French</option>
                          <option>German</option>
                          <option>Chinese</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="currency">Currency</Label>
                        <select id="currency" className="w-full p-2 border rounded">
                          <option>USD ($)</option>
                          <option>EUR (€)</option>
                          <option>GBP (£)</option>
                          <option>JPY (¥)</option>
                        </select>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Dark Mode</Label>
                          <p className="text-sm text-muted-foreground">Switch between light and dark themes</p>
                        </div>
                        <div className="flex items-center">
                          <Sun
                            className={`h-4 w-4 mr-2 ${theme === "light" ? "text-primary" : "text-muted-foreground"}`}
                          />
                          <Switch checked={theme === "dark"} onCheckedChange={toggleTheme} />
                          <Moon
                            className={`h-4 w-4 ml-2 ${theme === "dark" ? "text-primary" : "text-muted-foreground"}`}
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="payment">
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                      <div>
                        <CardTitle>Payment Methods</CardTitle>
                        <CardDescription>Manage your payment options</CardDescription>
                      </div>
                      <Button variant="outline" size="sm">
                        <CreditCard className="h-4 w-4 mr-2" />
                        Add New
                      </Button>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {userData.paymentMethods.map((card) => (
                          <div key={card.id} className="flex items-center justify-between p-3 border rounded">
                            <div className="flex items-center">
                              <div className="w-10 h-6 bg-muted rounded mr-3"></div>
                              <div>
                                <p className="font-medium">
                                  {card.type} •••• {card.last4}
                                </p>
                                <p className="text-sm text-muted-foreground">Expires {card.expiry}</p>
                              </div>
                            </div>
                            <div className="flex items-center">
                              {card.isDefault && (
                                <Badge variant="outline" className="mr-2">
                                  Default
                                </Badge>
                              )}
                              <Button variant="ghost" size="sm">
                                Edit
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="mt-6">
                    <CardHeader>
                      <CardTitle>Billing Address</CardTitle>
                      <CardDescription>Your billing information for payments</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="address">Street Address</Label>
                        <Input id="address" defaultValue="123 Main Street" />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="city">City</Label>
                          <Input id="city" defaultValue="New York" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="state">State/Province</Label>
                          <Input id="state" defaultValue="NY" />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="zip">Postal Code</Label>
                          <Input id="zip" defaultValue="10001" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="country">Country</Label>
                          <select id="country" className="w-full p-2 border rounded">
                            <option>United States</option>
                            <option>Canada</option>
                            <option>United Kingdom</option>
                            <option>Australia</option>
                          </select>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button>Save Address</Button>
                    </CardFooter>
                  </Card>
                </TabsContent>

                <TabsContent value="security">
                  <Card>
                    <CardHeader>
                      <CardTitle>Security Settings</CardTitle>
                      <CardDescription>Manage your account security</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="current-password">Current Password</Label>
                        <Input id="current-password" type="password" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="new-password">New Password</Label>
                        <Input id="new-password" type="password" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="confirm-password">Confirm New Password</Label>
                        <Input id="confirm-password" type="password" />
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button>Update Password</Button>
                    </CardFooter>
                  </Card>

                  <Card className="mt-6">
                    <CardHeader>
                      <CardTitle>Two-Factor Authentication</CardTitle>
                      <CardDescription>Add an extra layer of security to your account</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Enable 2FA</Label>
                          <p className="text-sm text-muted-foreground">
                            Secure your account with two-factor authentication
                          </p>
                        </div>
                        <Switch />
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="mt-6">
                    <CardHeader>
                      <CardTitle>Device Management</CardTitle>
                      <CardDescription>Manage devices that are logged into your account</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center border-b pb-3">
                          <div className="flex items-center">
                            <Smartphone className="h-5 w-5 mr-3 text-muted-foreground" />
                            <div>
                              <p className="font-medium">iPhone 13 Pro</p>
                              <p className="text-sm text-muted-foreground">Last active: Today, 10:30 AM</p>
                            </div>
                          </div>
                          <Badge>Current</Badge>
                        </div>
                        <div className="flex justify-between items-center border-b pb-3">
                          <div className="flex items-center">
                            <Globe className="h-5 w-5 mr-3 text-muted-foreground" />
                            <div>
                              <p className="font-medium">Chrome on Windows</p>
                              <p className="text-sm text-muted-foreground">Last active: Yesterday, 3:15 PM</p>
                            </div>
                          </div>
                          <Button variant="outline" size="sm">
                            Sign Out
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            ) : (
              <div>
                {activeTab === "profile" && (
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                      <div>
                        <CardTitle>Personal Information</CardTitle>
                        <CardDescription>Manage your personal details and contact information</CardDescription>
                      </div>
                      <Button variant="ghost" size="icon">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input id="name" defaultValue={userData.name} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" defaultValue={userData.email} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone</Label>
                        <Input id="phone" type="tel" defaultValue={userData.phone} />
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button>Save Changes</Button>
                    </CardFooter>
                  </Card>
                )}

                {activeTab === "preferences" && (
                  <div className="space-y-6">
                    <Card>
                      <CardHeader>
                        <CardTitle>Stay Preferences</CardTitle>
                        <CardDescription>Customize your stay experience</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="temperature">Room Temperature</Label>
                          <Input id="temperature" defaultValue={userData.preferences.roomTemperature} />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="pillow">Pillow Type</Label>
                          <select id="pillow" className="w-full p-2 border rounded">
                            <option>Memory Foam</option>
                            <option>Feather</option>
                            <option>Firm</option>
                            <option>Soft</option>
                          </select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="dietary">Dietary Restrictions</Label>
                          <Input id="dietary" defaultValue={userData.preferences.dietaryRestrictions} />
                        </div>
                        <div className="flex items-center justify-between">
                          <Label htmlFor="wakeup">Wake-up Calls</Label>
                          <Switch id="wakeup" defaultChecked={userData.preferences.wakeUpCalls === "Yes"} />
                        </div>
                        <div className="flex items-center justify-between">
                          <Label htmlFor="newspaper">Newspaper Delivery</Label>
                          <Switch
                            id="newspaper"
                            defaultChecked={userData.preferences.newspaperDelivery.startsWith("Yes")}
                          />
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button>Save Preferences</Button>
                      </CardFooter>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>App Preferences</CardTitle>
                        <CardDescription>Customize your app experience</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="language">Language</Label>
                          <select id="language" className="w-full p-2 border rounded">
                            <option>English</option>
                            <option>Spanish</option>
                            <option>French</option>
                            <option>German</option>
                            <option>Chinese</option>
                          </select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="currency">Currency</Label>
                          <select id="currency" className="w-full p-2 border rounded">
                            <option>USD ($)</option>
                            <option>EUR (€)</option>
                            <option>GBP (£)</option>
                            <option>JPY (¥)</option>
                          </select>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label>Dark Mode</Label>
                            <p className="text-sm text-muted-foreground">Switch between light and dark themes</p>
                          </div>
                          <div className="flex items-center">
                            <Sun
                              className={`h-4 w-4 mr-2 ${theme === "light" ? "text-primary" : "text-muted-foreground"}`}
                            />
                            <Switch checked={theme === "dark"} onCheckedChange={toggleTheme} />
                            <Moon
                              className={`h-4 w-4 ml-2 ${theme === "dark" ? "text-primary" : "text-muted-foreground"}`}
                            />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                )}

                {activeTab === "payment" && (
                  <div className="space-y-6">
                    <Card>
                      <CardHeader className="flex flex-row items-center justify-between">
                        <div>
                          <CardTitle>Payment Methods</CardTitle>
                          <CardDescription>Manage your payment options</CardDescription>
                        </div>
                        <Button variant="outline" size="sm">
                          <CreditCard className="h-4 w-4 mr-2" />
                          Add New
                        </Button>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {userData.paymentMethods.map((card) => (
                            <div key={card.id} className="flex items-center justify-between p-3 border rounded">
                              <div className="flex items-center">
                                <div className="w-10 h-6 bg-muted rounded mr-3"></div>
                                <div>
                                  <p className="font-medium">
                                    {card.type} •••• {card.last4}
                                  </p>
                                  <p className="text-sm text-muted-foreground">Expires {card.expiry}</p>
                                </div>
                              </div>
                              <div className="flex items-center">
                                {card.isDefault && (
                                  <Badge variant="outline" className="mr-2">
                                    Default
                                  </Badge>
                                )}
                                <Button variant="ghost" size="sm">
                                  Edit
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>Billing Address</CardTitle>
                        <CardDescription>Your billing information for payments</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="address">Street Address</Label>
                          <Input id="address" defaultValue="123 Main Street" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="city">City</Label>
                            <Input id="city" defaultValue="New York" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="state">State/Province</Label>
                            <Input id="state" defaultValue="NY" />
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="zip">Postal Code</Label>
                            <Input id="zip" defaultValue="10001" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="country">Country</Label>
                            <select id="country" className="w-full p-2 border rounded">
                              <option>United States</option>
                              <option>Canada</option>
                              <option>United Kingdom</option>
                              <option>Australia</option>
                            </select>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button>Save Address</Button>
                      </CardFooter>
                    </Card>
                  </div>
                )}

                {activeTab === "bookings" && (
                  <Card>
                    <CardHeader>
                      <CardTitle>My Bookings</CardTitle>
                      <CardDescription>View and manage your reservations</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="p-4 border rounded">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-medium">The Grand Bistro</h3>
                              <p className="text-sm text-muted-foreground">Dinner Reservation</p>
                              <div className="flex items-center text-sm mt-1">
                                <Calendar className="h-3.5 w-3.5 mr-1" />
                                <span>May 15, 2023 • 7:30 PM</span>
                              </div>
                            </div>
                            <Badge>Confirmed</Badge>
                          </div>
                          <div className="flex justify-end mt-4">
                            <Button variant="outline" size="sm">
                              View Details
                            </Button>
                          </div>
                        </div>

                        <div className="p-4 border rounded">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-medium">Deep Tissue Massage</h3>
                              <p className="text-sm text-muted-foreground">Spa Treatment</p>
                              <div className="flex items-center text-sm mt-1">
                                <Calendar className="h-3.5 w-3.5 mr-1" />
                                <span>May 16, 2023 • 2:00 PM</span>
                              </div>
                            </div>
                            <Badge>Confirmed</Badge>
                          </div>
                          <div className="flex justify-end mt-4">
                            <Button variant="outline" size="sm">
                              View Details
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline">View All Bookings</Button>
                    </CardFooter>
                  </Card>
                )}

                {activeTab === "security" && (
                  <div className="space-y-6">
                    <Card>
                      <CardHeader>
                        <CardTitle>Security Settings</CardTitle>
                        <CardDescription>Manage your account security</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="current-password">Current Password</Label>
                          <Input id="current-password" type="password" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="new-password">New Password</Label>
                          <Input id="new-password" type="password" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="confirm-password">Confirm New Password</Label>
                          <Input id="confirm-password" type="password" />
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button>Update Password</Button>
                      </CardFooter>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>Two-Factor Authentication</CardTitle>
                        <CardDescription>Add an extra layer of security to your account</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label>Enable 2FA</Label>
                            <p className="text-sm text-muted-foreground">
                              Secure your account with two-factor authentication
                            </p>
                          </div>
                          <Switch />
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>Device Management</CardTitle>
                        <CardDescription>Manage devices that are logged into your account</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="flex justify-between items-center border-b pb-3">
                            <div className="flex items-center">
                              <Smartphone className="h-5 w-5 mr-3 text-muted-foreground" />
                              <div>
                                <p className="font-medium">iPhone 13 Pro</p>
                                <p className="text-sm text-muted-foreground">Last active: Today, 10:30 AM</p>
                              </div>
                            </div>
                            <Badge>Current</Badge>
                          </div>
                          <div className="flex justify-between items-center border-b pb-3">
                            <div className="flex items-center">
                              <Globe className="h-5 w-5 mr-3 text-muted-foreground" />
                              <div>
                                <p className="font-medium">Chrome on Windows</p>
                                <p className="text-sm text-muted-foreground">Last active: Yesterday, 3:15 PM</p>
                              </div>
                            </div>
                            <Button variant="outline" size="sm">
                              Sign Out
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      <Navigation />
    </div>
  )
}

