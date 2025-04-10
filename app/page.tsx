import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"

// Define the data
const featuredClubs = [
  {
    id: "1",
    name: "Photography Club",
    description: "Explore the art of photography with like-minded enthusiasts.",
    image: "/images/photography-club.png",
    memberCount: 120,
    category: "Arts",
  },
  {
    id: "2",
    name: "Debate Society",
    description: "Sharpen your critical thinking and public speaking skills.",
    image: "/images/debate-society.png",
    memberCount: 85,
    category: "Academic",
  },
  {
    id: "3",
    name: "Robotics Club",
    description: "Design, build and program robots for competitions and fun.",
    image: "/images/robotics-club.png",
    memberCount: 64,
    category: "Technology",
  },
]

const upcomingEvents = [
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
]

export default function Home() {
  return (
    <div className="container mx-auto py-8 px-4">
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-bold mb-4">University Club Portal</h1>
        <p className="text-xl text-muted-foreground mb-6">Discover clubs and events on campus</p>
        <div className="flex max-w-md mx-auto gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input type="search" placeholder="Search clubs or events..." className="pl-8" />
          </div>
          <Button>Search</Button>
        </div>
      </header>

      <section className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Featured Clubs</h2>
          <Link href="/clubs">
            <Button variant="outline">View All Clubs</Button>
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredClubs.map((club) => (
            <Link href={`/clubs/${club.id}`} key={club.id}>
              <Card className="h-full hover:shadow-md transition-shadow">
                <CardHeader className="p-0">
                  <div className="h-48 w-full relative">
                    <img
                      src={club.image || "/placeholder.svg"}
                      alt={club.name}
                      className="h-full w-full object-cover rounded-t-lg"
                    />
                  </div>
                </CardHeader>
                <CardContent className="pt-6">
                  <CardTitle>{club.name}</CardTitle>
                  <CardDescription className="mt-2">{club.description}</CardDescription>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <div className="text-sm text-muted-foreground">{club.memberCount} members</div>
                  <div className="text-sm font-medium">{club.category}</div>
                </CardFooter>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Upcoming Events</h2>
          <Link href="/events">
            <Button variant="outline">View All Events</Button>
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {upcomingEvents.map((event) => (
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
      </section>
    </div>
  )
}
