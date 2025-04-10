"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Calendar, Clock, MapPin, Users } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

export default function EventPage({ params }: { params: { id: string } }) {
  const event = eventsData.find((e) => e.id === params.id) || eventsData[0]
  const [isRsvpd, setIsRsvpd] = useState(false)

  const toggleRsvp = () => {
    setIsRsvpd(!isRsvpd)
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="relative h-64 md:h-80 w-full mb-6">
            <img
              src={event.image || "/placeholder.svg"}
              alt={event.name}
              className="h-full w-full object-cover rounded-lg"
            />
            <Badge className="absolute top-4 right-4 text-sm px-3 py-1">{event.date}</Badge>
          </div>

          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">{event.name}</h1>
            <div className="flex items-center gap-2 text-muted-foreground mb-4">
              <Link href={`/clubs/${event.clubId}`} className="flex items-center gap-2 hover:text-foreground">
                <Avatar className="h-6 w-6">
                  <AvatarImage src={event.clubLogo} alt={event.club} />
                  <AvatarFallback>{event.club.substring(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
                <span>Hosted by {event.club}</span>
              </Link>
            </div>
            <div className="flex flex-wrap gap-6 mb-6">
              <div className="flex items-center gap-2">
                <Calendar size={18} className="text-muted-foreground" />
                <span>{event.fullDate}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={18} className="text-muted-foreground" />
                <span>{event.time}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin size={18} className="text-muted-foreground" />
                <span>{event.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Users size={18} className="text-muted-foreground" />
                <span>{event.attendees} attending</span>
              </div>
            </div>
            <Button onClick={toggleRsvp} className="w-full md:w-auto" variant={isRsvpd ? "outline" : "default"}>
              {isRsvpd ? "Cancel RSVP" : "RSVP to Event"}
            </Button>
          </div>

          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold mb-3">About This Event</h2>
              <p className="text-muted-foreground whitespace-pre-line">{event.fullDescription}</p>
            </div>

            <Separator />

            <div>
              <h2 className="text-xl font-semibold mb-3">Event Schedule</h2>
              <div className="space-y-4">
                {event.schedule.map((item, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="text-sm font-medium min-w-[80px]">{item.time}</div>
                    <div>
                      <h3 className="font-medium">{item.title}</h3>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {event.speakers && event.speakers.length > 0 && (
              <>
                <Separator />
                <div>
                  <h2 className="text-xl font-semibold mb-3">Speakers</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {event.speakers.map((speaker) => (
                      <Card key={speaker.id}>
                        <CardContent className="pt-6">
                          <div className="flex gap-4">
                            <Avatar className="h-16 w-16">
                              <AvatarImage src={speaker.avatar} alt={speaker.name} />
                              <AvatarFallback>{speaker.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                            </Avatar>
                            <div>
                              <h3 className="font-semibold">{speaker.name}</h3>
                              <p className="text-sm text-muted-foreground">{speaker.title}</p>
                              <p className="text-sm mt-2">{speaker.bio}</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Event Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="text-sm font-semibold mb-1">Date and Time</h3>
                <p className="text-muted-foreground">{event.fullDate}</p>
                <p className="text-muted-foreground">{event.time}</p>
              </div>
              <div>
                <h3 className="text-sm font-semibold mb-1">Location</h3>
                <p className="text-muted-foreground">{event.location}</p>
                {event.locationDetails && <p className="text-sm text-muted-foreground mt-1">{event.locationDetails}</p>}
              </div>
              <div>
                <h3 className="text-sm font-semibold mb-1">Cost</h3>
                <p className="text-muted-foreground">{event.cost || "Free"}</p>
              </div>
              <div>
                <h3 className="text-sm font-semibold mb-1">Contact</h3>
                <p className="text-muted-foreground">{event.contactEmail}</p>
              </div>
              <div>
                <h3 className="text-sm font-semibold mb-1">Share</h3>
                <div className="flex gap-2 mt-1">
                  <Button variant="outline" size="sm">
                    Facebook
                  </Button>
                  <Button variant="outline" size="sm">
                    Twitter
                  </Button>
                  <Button variant="outline" size="sm">
                    Email
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Hosted By</CardTitle>
            </CardHeader>
            <CardContent>
              <Link href={`/clubs/${event.clubId}`} className="flex items-center gap-4">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={event.clubLogo} alt={event.club} />
                  <AvatarFallback>{event.club.substring(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-medium">{event.club}</h3>
                  <p className="text-sm text-muted-foreground">{event.clubDescription}</p>
                </div>
              </Link>
              <div className="mt-4">
                <Link href={`/clubs/${event.clubId}`}>
                  <Button variant="outline" className="w-full">
                    View Club Profile
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Similar Events</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {similarEvents.map((similarEvent) => (
                  <Link href={`/events/${similarEvent.id}`} key={similarEvent.id} className="block">
                    <div className="flex gap-3">
                      <div className="min-w-[60px] text-center">
                        <div className="font-bold text-primary">{similarEvent.date.split(" ")[0]}</div>
                        <div className="text-sm text-muted-foreground">{similarEvent.date.split(" ")[1]}</div>
                      </div>
                      <div>
                        <h4 className="font-medium">{similarEvent.name}</h4>
                        <p className="text-sm text-muted-foreground">{similarEvent.club}</p>
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
        </div>
      </div>
    </div>
  )
}

const eventsData = [
  {
    id: "1",
    name: "Photography Exhibition",
    description: "Annual showcase of student photography work with guest speakers.",
    fullDescription:
      "Join us for the annual Photography Club Exhibition, showcasing the best work from our talented student photographers. This year's theme is 'Perspectives' - exploring how different viewpoints can change our understanding of the world around us.\n\nThe exhibition will feature over 50 photographs from 20 student photographers, along with special guest presentations from professional photographers in the industry.\n\nRefreshments will be provided, and all attendees will receive a digital catalog of the exhibition. This is a great opportunity to support your fellow students and experience the creative talent on campus.",
    image: "/images/photo-exhibition.png",
    date: "Apr 15",
    fullDate: "April 15, 2023",
    time: "3:00 PM - 7:00 PM",
    location: "Student Center Gallery",
    locationDetails: "Second floor, east wing of the Student Center",
    club: "Photography Club",
    clubId: "1",
    clubLogo: "/images/photography-club.png",
    clubDescription: "A community of photography enthusiasts",
    attendees: 45,
    cost: "Free",
    contactEmail: "photo@university.edu",
    schedule: [
      {
        time: "3:00 PM",
        title: "Exhibition Opens",
        description: "Doors open to the public",
      },
      {
        time: "3:30 PM",
        title: "Welcome Address",
        description: "Opening remarks from the Photography Club President",
      },
      {
        time: "4:00 PM",
        title: "Guest Speaker: Sarah Chen",
        description: "Professional photographer discussing 'The Art of Visual Storytelling'",
      },
      {
        time: "5:00 PM",
        title: "Student Presentations",
        description: "Selected photographers discuss their work",
      },
      {
        time: "6:00 PM",
        title: "Reception",
        description: "Refreshments and networking",
      },
      {
        time: "7:00 PM",
        title: "Exhibition Closes",
        description: "End of event",
      },
    ],
    speakers: [
      {
        id: "s1",
        name: "Sarah Chen",
        title: "Professional Photographer",
        bio: "Award-winning photographer with over 10 years of experience in portrait and landscape photography.",
        avatar: "/placeholder.svg",
      },
      {
        id: "s2",
        name: "David Wilson",
        title: "Photography Professor",
        bio: "Faculty member specializing in digital photography and post-processing techniques.",
        avatar: "/placeholder.svg",
      },
    ],
  },
]

const similarEvents = [
  {
    id: "2",
    name: "Portrait Photography Workshop",
    date: "Apr 22",
    club: "Photography Club",
  },
  {
    id: "3",
    name: "Campus Photo Walk",
    date: "May 5",
    club: "Photography Club",
  },
  {
    id: "4",
    name: "Digital Art Exhibition",
    date: "May 12",
    club: "Digital Media Club",
  },
]
