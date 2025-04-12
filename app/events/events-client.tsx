"use client"

import Image from "next/image"
import Link from "next/link"
import { CalendarIcon, ClockIcon, MapPinIcon, SearchIcon, PlusIcon, Loader2Icon, GridIcon, CalendarDaysIcon } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { eventsData } from "@/lib/data"
import { useState, useTransition } from "react"
import { useSession } from "next-auth/react"
import { toast } from "sonner"
import { Calendar } from "@/components/ui/calendar"
import { cn } from "@/lib/utils"

// Get current date for filtering
const currentDate = new Date('2024-04-14') // Set a fixed date for demo purposes
const oneWeekFromNow = new Date(currentDate)
oneWeekFromNow.setDate(currentDate.getDate() + 7)
const oneMonthFromNow = new Date(currentDate)
oneMonthFromNow.setMonth(currentDate.getMonth() + 1)

// Filter events by date
const thisWeekEvents = eventsData.filter(event => {
  const eventDate = new Date(event.fullDate)
  return eventDate >= currentDate && eventDate <= oneWeekFromNow
}).sort((a, b) => new Date(a.fullDate).getTime() - new Date(b.fullDate).getTime())

const thisMonthEvents = eventsData.filter(event => {
  const eventDate = new Date(event.fullDate)
  return eventDate > oneWeekFromNow && eventDate <= oneMonthFromNow
}).sort((a, b) => new Date(a.fullDate).getTime() - new Date(b.fullDate).getTime())

const pastEvents = eventsData.filter(event => {
  const eventDate = new Date(event.fullDate)
  return eventDate < currentDate
}).sort((a, b) => new Date(b.fullDate).getTime() - new Date(a.fullDate).getTime()) // Sort past events in reverse chronological order

function EventCard({ event }: { event: typeof eventsData[0] }) {
  const { data: session } = useSession()
  const [isPending, startTransition] = useTransition()
  const [isAdded, setIsAdded] = useState(false)

  const addToCalendar = () => {
    if (!session) {
      toast.error("Please sign in to add events to your calendar")
      return
    }

    startTransition(async () => {
      try {
        const response = await fetch("/api/calendar/add", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            eventId: event.id,
            userId: session.user.id,
            eventDetails: {
              name: event.name,
              description: event.description,
              date: event.fullDate,
              time: event.time,
              location: event.location,
            },
          }),
        })

        if (!response.ok) {
          throw new Error("Failed to add event to calendar")
        }

        setIsAdded(true)
        toast.success("Event added to your calendar!")
      } catch (error) {
        toast.error("Failed to add event to calendar")
        console.error("Error adding event to calendar:", error)
      }
    })
  }

  const exportToExternalCalendar = () => {
    const eventDate = new Date(event.fullDate)
    const [hours, minutes] = event.time.split(":").map(Number)
    eventDate.setHours(hours, minutes)

    const endDate = new Date(eventDate)
    endDate.setHours(endDate.getHours() + 2) // Default 2-hour duration

    const calendarEvent = {
      title: event.name,
      description: event.description,
      location: event.location,
      startTime: eventDate.toISOString(),
      endTime: endDate.toISOString(),
    }

    // Create ICS file
    const icsContent = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//MIT AOE//Events//EN",
      "BEGIN:VEVENT",
      `DTSTART:${eventDate.toISOString().replace(/[-:]/g, "").split(".")[0]}Z`,
      `DTEND:${endDate.toISOString().replace(/[-:]/g, "").split(".")[0]}Z`,
      `SUMMARY:${event.name}`,
      `DESCRIPTION:${event.description}`,
      `LOCATION:${event.location}`,
      "END:VEVENT",
      "END:VCALENDAR",
    ].join("\n")

    // Create and download ICS file
    const blob = new Blob([icsContent], { type: "text/calendar" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.setAttribute("download", `${event.name.replace(/\s+/g, "-")}.ics`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)

    toast.success("Event exported to calendar")
  }

  return (
    <div className="group">
      <Card className="h-full bg-card transition-all duration-300 hover:shadow-lg flex flex-col">
        <Link href={`/events/${event.id}`} className="flex-1">
          <div className="relative h-48 w-full overflow-hidden">
            <Image
              src={event.image}
              alt={event.name}
              fill
              priority
              className="object-cover rounded-t-lg transition-transform duration-300 group-hover:scale-105"
            />
          </div>
          <CardHeader>
            <CardTitle className="line-clamp-1">{event.name}</CardTitle>
            <CardDescription>
              <p className="line-clamp-2 mb-2">{event.description}</p>
              <div className="flex items-center gap-2 text-sm">
                <CalendarIcon className="h-4 w-4 text-primary" />
                <span>{event.date}</span>
                <ClockIcon className="h-4 w-4 ml-2 text-primary" />
                <span>{event.time}</span>
              </div>
              <div className="flex items-center gap-2 mt-2 text-sm">
                <MapPinIcon className="h-4 w-4 text-primary" />
                <span className="line-clamp-1">{event.location}</span>
              </div>
              <div className="mt-2 text-primary font-medium">
                {event.club}
              </div>
            </CardDescription>
          </CardHeader>
        </Link>
        <CardFooter className="flex flex-col p-6 pt-2 space-y-2 mt-auto">
          <Button
            variant={isAdded ? "secondary" : "default"}
            className="w-full"
            onClick={addToCalendar}
            disabled={isPending || isAdded}
          >
            {isPending ? (
              <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
            ) : isAdded ? (
              <>
                <CalendarIcon className="mr-2 h-4 w-4" />
                Added to Calendar
              </>
            ) : (
              <>
                <PlusIcon className="mr-2 h-4 w-4" />
                Add to Calendar
              </>
            )}
          </Button>
          <Button
            variant="outline"
            className="w-full"
            onClick={exportToExternalCalendar}
          >
            <CalendarDaysIcon className="mr-2 h-4 w-4" />
            Export to Calendar
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

function EmptyState({ message }: { message: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className="rounded-full bg-muted p-4 mb-4">
        <CalendarIcon className="h-6 w-6 text-muted-foreground" />
      </div>
      <h3 className="text-lg font-medium mb-2">No events found</h3>
      <p className="text-muted-foreground max-w-sm">{message}</p>
    </div>
  )
}

function LoadingEvents() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {Array.from({ length: 8 }).map((_, i) => (
        <Card key={i} className="h-[400px] bg-card animate-pulse">
          <div className="h-48 bg-muted rounded-t-lg" />
          <CardHeader>
            <div className="h-6 w-3/4 bg-muted rounded mb-2" />
            <div className="space-y-2">
              <div className="h-4 w-full bg-muted rounded" />
              <div className="h-4 w-5/6 bg-muted rounded" />
            </div>
            <div className="flex items-center gap-2 mt-4">
              <div className="h-4 w-4 bg-muted rounded-full" />
              <div className="h-4 w-24 bg-muted rounded" />
            </div>
          </CardHeader>
          <CardFooter className="pt-0">
            <div className="h-10 w-full bg-muted rounded" />
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

function CalendarView({ events }: { events: typeof eventsData }) {
  const [date, setDate] = useState<Date | undefined>(new Date())
  
  const eventsByDate = events.reduce((acc, event) => {
    const eventDate = new Date(event.fullDate).toDateString()
    if (!acc[eventDate]) {
      acc[eventDate] = []
    }
    acc[eventDate].push(event)
    return acc
  }, {} as Record<string, typeof eventsData>)

  return (
    <div className="flex flex-col md:flex-row gap-6">
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        className="rounded-md border"
        modifiers={{
          hasEvents: Object.keys(eventsByDate).map(date => new Date(date))
        }}
        modifiersStyles={{
          hasEvents: { backgroundColor: "hsl(var(--primary))", color: "white" }
        }}
      />
      <div className="flex-1">
        {date ? (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">
              Events on {date.toLocaleDateString()}
            </h3>
            {eventsByDate[date.toDateString()] ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {eventsByDate[date.toDateString()].map((event) => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground">No events scheduled for this date</p>
            )}
          </div>
        ) : (
          <p className="text-muted-foreground">Select a date to view events</p>
        )}
      </div>
    </div>
  )
}

export default function EventsClient() {
  const [searchQuery, setSearchQuery] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [viewMode, setViewMode] = useState<"grid" | "calendar">("grid")

  // Simulate loading state
  useState(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000)
    return () => clearTimeout(timer)
  })

  // Filter events by search query
  const filterEvents = (events: typeof eventsData) => {
    if (!searchQuery) return events
    const query = searchQuery.toLowerCase()
    return events.filter(event => 
      event.name.toLowerCase().includes(query) ||
      event.description.toLowerCase().includes(query) ||
      event.club.toLowerCase().includes(query) ||
      event.location.toLowerCase().includes(query)
    )
  }

  const filteredThisWeekEvents = filterEvents(thisWeekEvents)
  const filteredThisMonthEvents = filterEvents(thisMonthEvents)
  const filteredPastEvents = filterEvents(pastEvents)

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Upcoming Events</h1>
          <p className="text-muted-foreground max-w-3xl">
            Stay updated with the latest events and activities happening across all clubs.
          </p>
        </div>
        <div className="flex gap-4">
          <div className="relative w-full md:w-72">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search events..."
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <Button
              variant={viewMode === "grid" ? "default" : "outline"}
              size="icon"
              onClick={() => setViewMode("grid")}
            >
              <GridIcon className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === "calendar" ? "default" : "outline"}
              size="icon"
              onClick={() => setViewMode("calendar")}
            >
              <CalendarDaysIcon className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {viewMode === "calendar" ? (
        <CalendarView events={[...thisWeekEvents, ...thisMonthEvents, ...pastEvents]} />
      ) : (
        <Tabs defaultValue="this-week" className="mb-8">
          <TabsList className="w-full sm:w-auto">
            <TabsTrigger value="this-week">This Week</TabsTrigger>
            <TabsTrigger value="this-month">This Month</TabsTrigger>
            <TabsTrigger value="past">Past Events</TabsTrigger>
          </TabsList>
          {isLoading ? (
            <div className="mt-6">
              <LoadingEvents />
            </div>
          ) : (
            <>
              <TabsContent value="this-week" className="mt-6">
                {filteredThisWeekEvents.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredThisWeekEvents.map((event) => (
                      <EventCard key={event.id} event={event} />
                    ))}
                  </div>
                ) : (
                  <EmptyState message={searchQuery ? "No events match your search" : "No events scheduled for this week"} />
                )}
              </TabsContent>
              <TabsContent value="this-month" className="mt-6">
                {filteredThisMonthEvents.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredThisMonthEvents.map((event) => (
                      <EventCard key={event.id} event={event} />
                    ))}
                  </div>
                ) : (
                  <EmptyState message={searchQuery ? "No events match your search" : "No events scheduled for this month"} />
                )}
              </TabsContent>
              <TabsContent value="past" className="mt-6">
                {filteredPastEvents.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredPastEvents.map((event) => (
                      <EventCard key={event.id} event={event} />
                    ))}
                  </div>
                ) : (
                  <EmptyState message={searchQuery ? "No events match your search" : "No past events to show"} />
                )}
              </TabsContent>
            </>
          )}
        </Tabs>
      )}
    </div>
  )
} 