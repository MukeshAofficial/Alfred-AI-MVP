"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Search, Filter, MapPin, Calendar, Star, ChevronRight, Compass } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import Header from "@/components/header"
import { Navigation } from "@/components/navigation"
import { useMobile } from "@/hooks/use-mobile"
import { cn } from "@/lib/utils"

export default function ExplorePage() {
  const router = useRouter()
  const isMobile = useMobile()
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("all")

  // Mock data for experiences
  const experiences = [
    {
      id: "1",
      title: "City Walking Tour",
      category: "tour",
      location: "Downtown",
      rating: 4.8,
      price: "$35",
      image: "/placeholder.svg?height=200&width=300",
      description: "Explore the city's historic landmarks and hidden gems with our expert local guide.",
      duration: "3 hours",
      startTimes: ["9:00 AM", "2:00 PM"],
      featured: true,
    },
    {
      id: "2",
      title: "Wine Tasting Experience",
      category: "food",
      location: "Vineyard Valley (15 min drive)",
      rating: 4.9,
      price: "$75",
      image: "/placeholder.svg?height=200&width=300",
      description: "Sample exquisite local wines paired with artisanal cheeses in a scenic vineyard setting.",
      duration: "2.5 hours",
      startTimes: ["11:00 AM", "3:00 PM"],
      featured: true,
    },
    {
      id: "3",
      title: "Sunset Sailing Cruise",
      category: "adventure",
      location: "Marina Bay",
      rating: 4.7,
      price: "$95",
      image: "/placeholder.svg?height=200&width=300",
      description: "Sail along the coast and enjoy breathtaking views of the sunset with champagne service.",
      duration: "2 hours",
      startTimes: ["5:30 PM"],
      featured: true,
    },
    {
      id: "4",
      title: "Cooking Class: Local Cuisine",
      category: "food",
      location: "Culinary Institute",
      rating: 4.6,
      price: "$65",
      image: "/placeholder.svg?height=200&width=300",
      description: "Learn to prepare authentic local dishes with fresh ingredients from the market.",
      duration: "3 hours",
      startTimes: ["10:00 AM", "4:00 PM"],
      featured: false,
    },
    {
      id: "5",
      title: "Mountain Biking Adventure",
      category: "adventure",
      location: "Highland Trails (20 min drive)",
      rating: 4.5,
      price: "$45",
      image: "/placeholder.svg?height=200&width=300",
      description: "Ride through scenic mountain trails with varying difficulty levels for all skill levels.",
      duration: "4 hours",
      startTimes: ["8:00 AM", "1:00 PM"],
      featured: false,
    },
    {
      id: "6",
      title: "Historical Museum Tour",
      category: "culture",
      location: "City Center",
      rating: 4.4,
      price: "$20",
      image: "/placeholder.svg?height=200&width=300",
      description: "Discover the rich history and cultural heritage of the region through fascinating exhibits.",
      duration: "2 hours",
      startTimes: ["9:00 AM", "11:00 AM", "2:00 PM", "4:00 PM"],
      featured: false,
    },
    {
      id: "7",
      title: "Spa Day Retreat",
      category: "wellness",
      location: "Wellness Center",
      rating: 4.9,
      price: "$150",
      image: "/placeholder.svg?height=200&width=300",
      description: "Indulge in a full day of relaxation with massages, facials, and access to premium facilities.",
      duration: "5 hours",
      startTimes: ["10:00 AM", "12:00 PM"],
      featured: true,
    },
    {
      id: "8",
      title: "Night Photography Tour",
      category: "culture",
      location: "Various Locations",
      rating: 4.7,
      price: "$55",
      image: "/placeholder.svg?height=200&width=300",
      description:
        "Capture stunning night shots of the city's landmarks with guidance from a professional photographer.",
      duration: "3 hours",
      startTimes: ["7:00 PM"],
      featured: false,
    },
  ]

  const filteredExperiences = experiences.filter((exp) => {
    // Filter by search term
    const matchesSearch =
      exp.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      exp.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      exp.location.toLowerCase().includes(searchTerm.toLowerCase())

    // Filter by tab
    const matchesTab =
      activeTab === "all" ||
      (activeTab === "featured" && exp.featured) ||
      (activeTab === "tours" && exp.category === "tour") ||
      (activeTab === "food" && exp.category === "food") ||
      (activeTab === "adventure" && exp.category === "adventure")

    return matchesSearch && matchesTab
  })

  const handleExperienceClick = (id) => {
    router.push(`/explore/${id}`)
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header title="Local Experiences" showSearch showNotification />

      <main className={cn("flex-1 container mx-auto px-4 py-6", isMobile ? "pb-20" : "")}>
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
          <div>
            <h1 className="text-2xl font-bold mb-2">Explore Experiences</h1>
            <p className="text-muted-foreground">Discover unique activities and adventures</p>
          </div>

          {!isMobile && (
            <div className="flex gap-4">
              <div className="relative w-[300px]">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search experiences..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Button variant="outline" className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                <span>Filters</span>
              </Button>
            </div>
          )}
        </div>

        {isMobile && (
          <div className="bg-card rounded-lg shadow-sm p-4 mb-6">
            <div className="relative mb-4">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search experiences..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        )}

        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="mb-6">
          <TabsList className="w-full md:w-auto grid grid-cols-4 md:flex">
            <TabsTrigger value="all" className="flex-1 md:flex-initial">
              All
            </TabsTrigger>
            <TabsTrigger value="featured" className="flex-1 md:flex-initial">
              Featured
            </TabsTrigger>
            <TabsTrigger value="tours" className="flex-1 md:flex-initial">
              Tours
            </TabsTrigger>
            <TabsTrigger value="food" className="flex-1 md:flex-initial">
              Food & Drink
            </TabsTrigger>
            <TabsTrigger value="adventure" className="hidden md:block">
              Adventure
            </TabsTrigger>
            <TabsTrigger value="culture" className="hidden md:block">
              Culture
            </TabsTrigger>
            <TabsTrigger value="wellness" className="hidden md:block">
              Wellness
            </TabsTrigger>
          </TabsList>
        </Tabs>

        {filteredExperiences.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredExperiences.map((experience) => (
              <Card
                key={experience.id}
                className="overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => handleExperienceClick(experience.id)}
              >
                <div className="h-48 relative">
                  <img
                    src={experience.image || "/placeholder.svg"}
                    alt={experience.title}
                    className="w-full h-full object-cover"
                  />
                  <Badge className="absolute top-2 right-2 capitalize">{experience.category}</Badge>
                  {experience.featured && (
                    <Badge variant="secondary" className="absolute top-2 left-2">
                      Featured
                    </Badge>
                  )}
                </div>
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="font-medium text-lg">{experience.title}</h3>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-500 mr-1" />
                      <span>{experience.rating}</span>
                    </div>
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground mb-2">
                    <MapPin className="h-3 w-3 mr-1" />
                    <span>{experience.location}</span>
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground mb-3">
                    <Calendar className="h-3 w-3 mr-1" />
                    <span>{experience.duration}</span>
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-2">{experience.description}</p>
                </CardContent>
                <CardFooter className="px-4 py-3 border-t flex justify-between items-center">
                  <span className="font-medium">{experience.price} per person</span>
                  <Button size="sm">
                    View Details <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Compass className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium mb-2">No experiences found</h3>
            <p className="text-muted-foreground mb-6">
              Try adjusting your search or filters to find what you're looking for.
            </p>
            <Button
              variant="outline"
              onClick={() => {
                setSearchTerm("")
                setActiveTab("all")
              }}
            >
              Clear Filters
            </Button>
          </div>
        )}
      </main>

      <Navigation />
    </div>
  )
}

