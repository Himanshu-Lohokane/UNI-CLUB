import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Define the data
const allEvents = [
  {
    id: "1",
    name: "Photography Exhibition",
    description: "Annual showcase of student photography work with guest speakers.",
    image: "/images/photo-exhibition.png",
    date: "Apr 15",
    time: "3:00 PM - 7:00 PM",
    location: "Student Center Gallery",
    club: "Photography Club",
  },
  {
    id: "2",
    name: "Public Speaking Workshop",
    description: "Learn effective techniques to improve your presentation skills.",
    image: "/images/workshop.png",
    date: "Apr 18",
    time: "5:30 PM - 7:30 PM",
    location: "Humanities Building, Room 302",
    club: "Debate Society",
  },
  {
    id: "3",
    name: "Robot Battle Royale",
    description: "Watch student-built robots compete in an exciting tournament.",
    image: "/images/robot-battle.png",
    date: "Apr 22",
    time: "1:00 PM - 5:00 PM",
    location: "Engineering Building Atrium",
    club: "Robotics Club",
  },
  // Keep the rest as placeholders or add more images as needed
  {
    id: "4",
    name: "Chess Tournament",
    description: "Test your skills in our monthly chess competition.",
    image: "/placeholder.svg",
    date: "Apr 25",
    time: "4:00 PM - 8:00 PM",
    location: "Student Union, Room 105",
    club: "Chess Club",
  },
  {
    id: "5",
    name: "Basketball Friendly Match",
    description: "Join us for a friendly basketball game between clubs.",
    image: "/placeholder.svg",
    date: "Apr 29",
    time: "6:00 PM - 8:00 PM",
    location: "University Sports Center",
    club: "Basketball Club",
  },
  {
    id: "6",
    name: "Campus Cleanup Day",
    description: "Help make our campus beautiful and sustainable.",
    image: "/placeholder.svg",
    date: "May 2",
    time: "10:00 AM - 1:00 PM",
    location: "Meet at University Quad",
    club: "Environmental Society",
  },
]

export default function EventsPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <header className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Campus Events</h1>
        <p className="text-muted-foreground mb-6">Discover upcoming events hosted by university clubs</p>
        <div className="flex max-w-md gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input type="search" placeholder="Search events..." className="pl-8" />
          </div>
          <Button>Search</Button>
        </div>
      </header>

      <Tabs defaultValue="upcoming" className="mb-8">
        <TabsList>
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="this-week">This Week</TabsTrigger>
          <TabsTrigger value="this-month">This Month</TabsTrigger>
          <TabsTrigger value="past">Past Events</TabsTrigger>
        </TabsList>
        <TabsContent value="upcoming" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {allEvents.map((event) => (
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
                        {event.date}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <CardTitle>{event.name}</CardTitle>
                    <div className="text-sm text-muted-foreground mt-1">Hosted by {event.club}</div>
                    <CardDescription className="mt-2">{event.description}</CardDescription>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <div className="text-sm text-muted-foreground">{event.location}</div>
                    <div className="text-sm font-medium">{event.time}</div>
                  </CardFooter>
                </Card>
              </Link>
            ))}
          </div>
        </TabsContent>
        {/* Other tab contents would be similar but filtered by date */}
      </Tabs>
    </div>
  )
}
