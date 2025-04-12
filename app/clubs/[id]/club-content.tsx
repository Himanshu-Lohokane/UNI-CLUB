"use client"

import { useState } from "react"
import { clubsData } from "../../../data/clubs"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, MapPin, Users, Mail, Globe, Instagram, Twitter, Facebook, Search, Share2, Copy, Check } from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Input } from "@/components/ui/input"
import { toast } from "@/components/ui/use-toast"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

export default function ClubContent({ id }: { id: string }) {
  const club = clubsData.find((club) => club.id === id)
  const [isMember, setIsMember] = useState(false)
  const [memberSearchQuery, setMemberSearchQuery] = useState("")
  const [copied, setCopied] = useState(false)

  if (!club) {
    notFound()
  }

  const toggleMembership = () => {
    setIsMember(!isMember)
    toast({
      title: isMember ? "Left club" : "Joined club",
      description: isMember ? `You have left ${club.name}` : `You have joined ${club.name}`,
    })
  }

  const filteredMembers = club.members.filter(member => 
    member.name.toLowerCase().includes(memberSearchQuery.toLowerCase())
  )

  const copyShareLink = () => {
    navigator.clipboard.writeText(window.location.href)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
    toast({
      title: "Link copied!",
      description: "Club page link has been copied to clipboard",
    })
  }

  // Get related clubs by filtering out the current club and taking the first 3
  const relatedClubs = clubsData
    .filter((c) => c.id !== club.id)
    .slice(0, 3)

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="relative h-64 md:h-80 w-full mb-6">
            <img
              src={club.bannerImage || "/placeholder.svg"}
              alt={`${club.name} banner`}
              className="h-full w-full object-cover rounded-lg"
            />
          </div>

          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
            <div className="flex items-center gap-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src={club.logo} alt={club.name} />
                <AvatarFallback>{club.name.substring(0, 2).toUpperCase()}</AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-3xl font-bold">{club.name}</h1>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Users size={16} />
                  <span>{club.memberCount} members</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline" size="icon" onClick={copyShareLink}>
                      {copied ? <Check size={16} /> : <Share2 size={16} />}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Share club page</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <Button onClick={toggleMembership} variant={isMember ? "outline" : "default"}>
                {isMember ? "Leave Club" : "Join Club"}
              </Button>
            </div>
          </div>

          <Tabs defaultValue="about">
            <TabsList className="mb-6">
              <TabsTrigger value="about">About</TabsTrigger>
              <TabsTrigger value="events">Events</TabsTrigger>
              <TabsTrigger value="members">Members</TabsTrigger>
              <TabsTrigger value="gallery">Gallery</TabsTrigger>
            </TabsList>
            <TabsContent value="about">
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-semibold mb-3">About {club.name}</h2>
                  <p className="text-muted-foreground">{club.description}</p>
                </div>
                <div>
                  <h2 className="text-xl font-semibold mb-3">Mission</h2>
                  <p className="text-muted-foreground">{club.mission}</p>
                </div>
                <div>
                  <h2 className="text-xl font-semibold mb-3">Meeting Information</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center gap-2">
                      <Calendar size={18} className="text-muted-foreground" />
                      <span>{club.meetingDay}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock size={18} className="text-muted-foreground" />
                      <span>{club.meetingTime}</span>
                    </div>
                    <div className="flex items-center gap-2 md:col-span-2">
                      <MapPin size={18} className="text-muted-foreground" />
                      <span>{club.meetingLocation}</span>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="events">
              <div className="space-y-6">
                <h2 className="text-xl font-semibold mb-3">Upcoming Events</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {club.events.map((event) => (
                    <Link href={`/events/${event.id}`} key={event.id}>
                      <Card className="h-full hover:shadow-md transition-shadow">
                        <CardHeader className="p-0">
                          <div className="h-48 w-full relative">
                            <img
                              src={event.image || "/placeholder.svg"}
                              alt={event.name}
                              className="h-full w-full object-cover rounded-t-lg"
                            />
                            <div className="absolute top-2 right-2 bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium">
                              {typeof event.date === 'string' && event.date.includes("-") 
                                ? new Date(event.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
                                : event.date}
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent className="pt-6">
                          <CardTitle>{event.name}</CardTitle>
                          <CardDescription className="mt-2">{event.description}</CardDescription>
                          <div className="flex items-center gap-2 mt-4 text-sm text-muted-foreground">
                            <Clock size={14} />
                            <span>{event.time}</span>
                            <MapPin size={14} className="ml-2" />
                            <span>{event.location}</span>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              </div>
            </TabsContent>
            <TabsContent value="members">
              <div className="space-y-6">
                <h2 className="text-xl font-semibold mb-3">Club Leaders</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                  {club.leaders.map((leader) => (
                    <Card key={leader.id}>
                      <CardContent className="pt-6">
                        <div className="flex flex-col items-center text-center">
                          <Avatar className="h-20 w-20 mb-4">
                            <AvatarImage src={leader.avatar} alt={leader.name} />
                            <AvatarFallback>{leader.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                          </Avatar>
                          <h3 className="font-semibold">{leader.name}</h3>
                          <p className="text-sm text-muted-foreground">{leader.role}</p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold">Members</h2>
                  <div className="relative w-full max-w-sm">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search members..."
                      className="pl-8"
                      value={memberSearchQuery}
                      onChange={(e) => setMemberSearchQuery(e.target.value)}
                    />
                  </div>
                </div>
                
                {filteredMembers.length === 0 ? (
                  <p className="text-center text-muted-foreground py-8">No members found matching "{memberSearchQuery}"</p>
                ) : (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mt-4">
                    {filteredMembers.map((member) => (
                      <div key={member.id} className="flex flex-col items-center text-center">
                        <Avatar className="h-16 w-16 mb-2">
                          <AvatarImage src={member.avatar} alt={member.name} />
                          <AvatarFallback>{member.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                        </Avatar>
                        <h4 className="text-sm font-medium">{member.name}</h4>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </TabsContent>
            <TabsContent value="gallery">
              <div className="space-y-6">
                <h2 className="text-xl font-semibold mb-3">Photo Gallery</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {club.gallery.map((photo, index) => (
                    <div key={index} className="aspect-square relative rounded-lg overflow-hidden">
                      <img
                        src={photo || "/placeholder.svg"}
                        alt={`${club.name} gallery photo ${index + 1}`}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Club Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="text-sm font-semibold mb-1">Category</h3>
                <p className="text-muted-foreground">{club.category}</p>
              </div>
              <div>
                <h3 className="text-sm font-semibold mb-1">Founded</h3>
                <p className="text-muted-foreground">{club.founded}</p>
              </div>
              <div>
                <h3 className="text-sm font-semibold mb-1">Email</h3>
                <p className="text-muted-foreground">{club.email}</p>
              </div>
              <div>
                <h3 className="text-sm font-semibold mb-1">Social Media</h3>
                <div className="flex gap-2 mt-1">
                  {club.socialMedia.map((social) => (
                    <Link
                      key={social.platform}
                      href={social.url}
                      className="text-muted-foreground hover:text-foreground"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {social.platform === "Instagram" && <span>Instagram</span>}
                      {social.platform === "Twitter" && <span>Twitter</span>}
                      {social.platform === "Facebook" && <span>Facebook</span>}
                    </Link>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Upcoming Events</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {club.events.slice(0, 3).map((event) => (
                  <Link href={`/events/${event.id}`} key={event.id} className="block">
                    <div className="flex gap-3">
                      <div className="min-w-[60px] text-center">
                        <div className="font-bold text-primary">
                          {event.date.includes(" ") 
                            ? event.date.split(" ")[0] 
                            : new Date(event.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {event.date.includes(" ") 
                            ? event.date.split(" ")[1] 
                            : new Date(event.date).getFullYear().toString()}
                        </div>
                      </div>
                      <div>
                        <h4 className="font-medium">{event.name}</h4>
                        <p className="text-sm text-muted-foreground">{event.location}</p>
                      </div>
                    </div>
                  </Link>
                ))}
                <Link href="/events">
                  <Button variant="outline" className="w-full">
                    View All Events
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Related Clubs</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {clubsData
                  .filter((c) => c.id !== club.id)
                  .slice(0, 3)
                  .map((relatedClub) => (
                    <Link href={`/clubs/${relatedClub.id}`} key={relatedClub.id} className="block">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={relatedClub.logo} alt={relatedClub.name} />
                          <AvatarFallback>{relatedClub.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h4 className="font-medium">{relatedClub.name}</h4>
                          <p className="text-sm text-muted-foreground">{relatedClub.category}</p>
                        </div>
                      </div>
                    </Link>
                  ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
} 