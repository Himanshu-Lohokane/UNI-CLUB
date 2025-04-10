import { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { CalendarIcon, ClockIcon, MapPinIcon } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

export const metadata: Metadata = {
  title: "Events - MIT AOE",
  description: "Upcoming events at MIT AOE",
}

// Get current date for filtering
const now = new Date()
const oneWeekFromNow = new Date(now)
oneWeekFromNow.setDate(now.getDate() + 7)
const oneMonthFromNow = new Date(now)
oneMonthFromNow.setMonth(now.getMonth() + 1)

// Events data
const eventsData = [
  {
    id: "1",
    name: "Hackathon 2023",
    description: "24-hour coding competition to build innovative solutions.",
    date: "Dec 15, 2023",
    time: "9:00 AM",
    location: "Main Auditorium",
    image: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?q=80&w=800&auto=format&fit=crop",
    club: "Coding Club"
  },
  {
    id: "2",
    name: "Photography Exhibition",
    description: "Annual showcase of student photography work.",
    date: "Dec 18, 2023",
    time: "3:00 PM",
    location: "Art Gallery",
    image: "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?q=80&w=800&auto=format&fit=crop",
    club: "Photography Club"
  },
  {
    id: "3",
    name: "Robotics Workshop",
    description: "Learn to build and program basic robots.",
    date: "Dec 20, 2023",
    time: "2:00 PM",
    location: "Engineering Lab",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=800&auto=format&fit=crop",
    club: "Robotics Club"
  },
  {
    id: "4",
    name: "Cultural Night",
    description: "Celebration of music, dance, and cultural performances.",
    date: "Dec 22, 2023",
    time: "6:00 PM",
    location: "Open Air Theatre",
    image: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?q=80&w=800&auto=format&fit=crop",
    club: "Cultural Club"
  },
  {
    id: "5",
    name: "Tech Talk Series",
    description: "Industry experts sharing insights on latest technologies.",
    date: "Dec 25, 2023",
    time: "4:00 PM",
    location: "Seminar Hall",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=800&auto=format&fit=crop",
    club: "IEEE Student Branch"
  },
  {
    id: "6",
    name: "Sports Tournament",
    description: "Inter-college sports competition.",
    date: "Dec 28, 2023",
    time: "10:00 AM",
    location: "Sports Complex",
    image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?q=80&w=800&auto=format&fit=crop",
    club: "Sports Club"
  }
]

// Filter events by date
const thisWeekEvents = eventsData.slice(0, 4)
const thisMonthEvents = eventsData.slice(4, 6)
const pastEvents = eventsData.slice(6, 7)

function EventCard({ event }: { event: typeof eventsData[0] }) {
  return (
    <Link href={`/events/${event.id}`} className="hover-zoom">
      <Card className="h-full bg-card">
        <div className="relative h-48 w-full">
          <Image
            src={event.image}
            alt={event.name}
            fill
            priority
            className="object-cover rounded-t-lg"
          />
        </div>
        <CardHeader>
          <CardTitle>{event.name}</CardTitle>
          <CardDescription>
            {event.description}
            <div className="flex items-center gap-2 mt-2">
              <CalendarIcon className="h-4 w-4" />
              <span>{event.date}</span>
              <ClockIcon className="h-4 w-4 ml-2" />
              <span>{event.time}</span>
            </div>
            <div className="mt-2 text-primary font-medium">
              {event.club}
            </div>
          </CardDescription>
        </CardHeader>
      </Card>
    </Link>
  )
}

export default function EventsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Upcoming Events</h1>
      <p className="text-gray-600 mb-8 max-w-3xl">
        Stay updated with the latest events and activities happening across all clubs.
      </p>

      <Tabs defaultValue="this-week" className="mb-8">
        <TabsList>
          <TabsTrigger value="this-week">This Week</TabsTrigger>
          <TabsTrigger value="this-month">This Month</TabsTrigger>
          <TabsTrigger value="past">Past Events</TabsTrigger>
        </TabsList>
        <TabsContent value="this-week" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {thisWeekEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="this-month" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {thisMonthEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="past" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {pastEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
