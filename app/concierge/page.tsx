"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import ChatInterface from "@/components/chat-interface"
import Header from "@/components/header"
import Navigation from "@/components/navigation"
import { useMobile } from "@/hooks/use-mobile"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { MessageSquare, History, Star, Settings, Mic, HelpCircle, Download, Share2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export default function ConciergePage() {
  const router = useRouter()
  const isMobile = useMobile()
  const [activeTab, setActiveTab] = useState("chat")

  // Mock chat history data
  const chatHistory = [
    {
      id: "chat1",
      title: "Room Service Request",
      preview: "I'd like to order breakfast for tomorrow morning...",
      date: "Today, 10:30 AM",
      unread: false,
    },
    {
      id: "chat2",
      title: "Spa Booking Assistance",
      preview: "Can you help me book a massage for tomorrow?",
      date: "Yesterday, 3:15 PM",
      unread: true,
    },
    {
      id: "chat3",
      title: "Local Restaurant Recommendations",
      preview: "What are some good restaurants within walking distance?",
      date: "May 15, 2023",
      unread: false,
    },
    {
      id: "chat4",
      title: "Late Checkout Request",
      preview: "I need to extend my checkout time tomorrow...",
      date: "May 12, 2023",
      unread: false,
    },
  ]

  // Function to handle voice button click
  const handleVoiceClick = () => {
    router.push("/voice")
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header title="AI Concierge" showNotification />

      <div className={cn("container mx-auto px-4 py-6 flex-1", isMobile ? "pb-20" : "")}>
        <div className="flex flex-col md:flex-row gap-6 h-full">
          {/* Sidebar for desktop */}
          {!isMobile && (
            <div className="w-1/4 hidden md:block">
              <Card className="h-full">
                <CardContent className="p-4 h-full flex flex-col">
                  <div className="space-y-1 mb-6">
                    <h2 className="text-xl font-bold">AI Concierge</h2>
                    <p className="text-sm text-gray-500">Your personal hotel assistant</p>
                  </div>

                  <div className="space-y-2">
                    <Button
                      variant={activeTab === "chat" ? "default" : "ghost"}
                      className="w-full justify-start"
                      onClick={() => setActiveTab("chat")}
                    >
                      <MessageSquare className="mr-2 h-4 w-4" />
                      Chat
                    </Button>
                    <Button
                      variant={activeTab === "history" ? "default" : "ghost"}
                      className="w-full justify-start"
                      onClick={() => setActiveTab("history")}
                    >
                      <History className="mr-2 h-4 w-4" />
                      Chat History
                    </Button>
                    <Button
                      variant={activeTab === "voice" ? "default" : "ghost"}
                      className="w-full justify-start"
                      onClick={handleVoiceClick}
                    >
                      <Mic className="mr-2 h-4 w-4" />
                      Voice Assistant
                    </Button>
                    <Button
                      variant={activeTab === "favorites" ? "default" : "ghost"}
                      className="w-full justify-start"
                      onClick={() => setActiveTab("favorites")}
                    >
                      <Star className="mr-2 h-4 w-4" />
                      Favorites
                    </Button>
                    <Button
                      variant={activeTab === "settings" ? "default" : "ghost"}
                      className="w-full justify-start"
                      onClick={() => setActiveTab("settings")}
                    >
                      <Settings className="mr-2 h-4 w-4" />
                      Settings
                    </Button>
                    <Button
                      variant={activeTab === "help" ? "default" : "ghost"}
                      className="w-full justify-start"
                      onClick={() => setActiveTab("help")}
                    >
                      <HelpCircle className="mr-2 h-4 w-4" />
                      Help & Support
                    </Button>
                  </div>

                  <div className="mt-auto pt-6">
                    <div className="text-xs text-gray-500">
                      <p>The AI Butler v1.0</p>
                      <p>© 2023 Luxury Hotel</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Main content */}
          <div className={cn("flex-1", isMobile ? "w-full" : "w-3/4")}>
            {isMobile ? (
              <div className="relative">
                <ChatInterface />

                {/* Mobile History Button */}
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="secondary" size="sm" className="absolute top-2 right-2 rounded-full h-10 w-10 p-0">
                      <History className="h-5 w-5" />
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="right">
                    <div className="py-6">
                      <h2 className="text-lg font-semibold mb-4">Chat History</h2>
                      <div className="space-y-3">
                        {chatHistory.map((chat) => (
                          <div
                            key={chat.id}
                            className={cn(
                              "p-3 rounded-lg border cursor-pointer hover:bg-muted/50 transition-colors",
                              chat.unread && "border-primary/50 bg-primary/5",
                            )}
                          >
                            <div className="flex justify-between items-start">
                              <div>
                                <h3 className="font-medium">{chat.title}</h3>
                                <p className="text-sm text-muted-foreground line-clamp-1">{chat.preview}</p>
                              </div>
                              {chat.unread && <div className="h-2 w-2 rounded-full bg-primary mt-1.5"></div>}
                            </div>
                            <p className="text-xs text-muted-foreground mt-1">{chat.date}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </SheetContent>
                </Sheet>

                {/* Mobile Voice Button */}
                <Button
                  variant="secondary"
                  size="sm"
                  className="absolute top-2 left-2 rounded-full h-10 w-10 p-0"
                  onClick={handleVoiceClick}
                >
                  <Mic className="h-5 w-5" />
                </Button>
              </div>
            ) : (
              <Card className="h-full">
                <CardContent className="p-0 h-full">
                  <Tabs defaultValue="chat" value={activeTab} className="h-full">
                    <TabsContent value="chat" className="h-full m-0">
                      <ChatInterface />
                    </TabsContent>
                    <TabsContent value="history" className="h-full m-0 p-6">
                      <h2 className="text-xl font-bold mb-4">Chat History</h2>
                      <div className="space-y-4">
                        {chatHistory.map((chat) => (
                          <Card
                            key={chat.id}
                            className={cn(
                              "cursor-pointer hover:shadow-md transition-shadow",
                              chat.unread && "border-primary/50",
                            )}
                          >
                            <CardContent className="p-4">
                              <div className="flex justify-between items-start">
                                <div>
                                  <h3 className="font-medium">{chat.title}</h3>
                                  <p className="text-sm text-gray-500 mt-1">{chat.preview}</p>
                                  <p className="text-xs text-gray-400 mt-2">{chat.date}</p>
                                </div>
                                <div className="flex items-center gap-2">
                                  {chat.unread && <div className="h-2 w-2 rounded-full bg-primary"></div>}
                                  <Button variant="ghost" size="sm">
                                    <MessageSquare className="h-4 w-4" />
                                  </Button>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </TabsContent>
                    <TabsContent value="favorites" className="h-full m-0 p-6">
                      <h2 className="text-xl font-bold mb-4">Favorites</h2>
                      <div className="text-center py-12">
                        <Star className="h-12 w-12 mx-auto text-gray-300 mb-4" />
                        <h3 className="text-lg font-medium mb-2">No Favorites Yet</h3>
                        <p className="text-gray-500">Star your favorite conversations to find them here.</p>
                      </div>
                    </TabsContent>
                    <TabsContent value="settings" className="h-full m-0 p-6">
                      <h2 className="text-xl font-bold mb-4">Settings</h2>
                      <div className="space-y-6">
                        <div>
                          <h3 className="text-lg font-medium mb-2">Notification Preferences</h3>
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <span>Chat Notifications</span>
                              <input type="checkbox" defaultChecked />
                            </div>
                            <div className="flex items-center justify-between">
                              <span>Booking Reminders</span>
                              <input type="checkbox" defaultChecked />
                            </div>
                            <div className="flex items-center justify-between">
                              <span>Special Offers</span>
                              <input type="checkbox" />
                            </div>
                          </div>
                        </div>
                        <div>
                          <h3 className="text-lg font-medium mb-2">Language</h3>
                          <select className="w-full p-2 border rounded">
                            <option>English</option>
                            <option>Spanish</option>
                            <option>French</option>
                            <option>German</option>
                            <option>Chinese</option>
                          </select>
                        </div>
                        <div>
                          <h3 className="text-lg font-medium mb-2">Chat History</h3>
                          <div className="flex gap-2">
                            <Button variant="outline" className="flex items-center gap-2">
                              <Download className="h-4 w-4" />
                              Export Chat History
                            </Button>
                            <Button variant="outline" className="flex items-center gap-2 text-destructive">
                              Clear History
                            </Button>
                          </div>
                        </div>
                      </div>
                    </TabsContent>
                    <TabsContent value="help" className="h-full m-0 p-6">
                      <h2 className="text-xl font-bold mb-4">Help & Support</h2>
                      <div className="space-y-4">
                        <Card>
                          <CardContent className="p-4">
                            <h3 className="font-medium mb-2">Frequently Asked Questions</h3>
                            <div className="space-y-2">
                              <details className="cursor-pointer">
                                <summary className="font-medium">How do I book a spa appointment?</summary>
                                <p className="mt-2 text-sm text-gray-500 pl-4">
                                  You can book a spa appointment by asking the AI Butler, visiting the Spa Services
                                  section, or contacting the front desk.
                                </p>
                              </details>
                              <details className="cursor-pointer">
                                <summary className="font-medium">Can I order room service through the app?</summary>
                                <p className="mt-2 text-sm text-gray-500 pl-4">
                                  Yes, you can order room service by going to the Room Dining section or by asking the
                                  AI Butler to help you place an order.
                                </p>
                              </details>
                              <details className="cursor-pointer">
                                <summary className="font-medium">How do I request a late checkout?</summary>
                                <p className="mt-2 text-sm text-gray-500 pl-4">
                                  You can request a late checkout by asking the AI Butler or by contacting the front
                                  desk through the app.
                                </p>
                              </details>
                            </div>
                          </CardContent>
                        </Card>

                        <Card>
                          <CardContent className="p-4">
                            <h3 className="font-medium mb-2">Contact Support</h3>
                            <p className="text-sm text-gray-500 mb-4">
                              Need additional help? Contact our support team.
                            </p>
                            <div className="space-y-2">
                              <Button variant="outline" className="w-full justify-start">
                                <MessageSquare className="mr-2 h-4 w-4" />
                                Chat with Support
                              </Button>
                              <Button variant="outline" className="w-full justify-start">
                                <Share2 className="mr-2 h-4 w-4" />
                                Email Support
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>

      <Navigation />
    </div>
  )
}

