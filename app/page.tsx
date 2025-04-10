import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"

// Featured clubs data
const featuredClubs = [
  {
    id: 1,
    name: "Robotics Club",
    description: "Build and program robots, participate in competitions, and explore the future of automation.",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=800&auto=format&fit=crop",
    link: "/clubs/robotics"
  },
  {
    id: 2,
    name: "Photography Club",
    description: "Capture moments, learn techniques, and showcase your artistic vision through photography.",
    image: "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?q=80&w=800&auto=format&fit=crop",
    link: "/clubs/photography"
  },
  {
    id: 3,
    name: "Coding Club",
    description: "Learn programming, develop applications, and collaborate on exciting tech projects.",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop",
    link: "/clubs/coding"
  }
]

// Upcoming events data
const upcomingEvents = [
  {
    id: 1,
    name: "Hackathon 2023",
    description: "24-hour coding competition to build innovative solutions.",
    date: "Dec 15, 2023",
    image: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?q=80&w=800&auto=format&fit=crop",
    link: "/events/hackathon-2023"
  },
  {
    id: 2,
    name: "Cultural Fest",
    description: "Annual celebration of art, music, and dance performances.",
    date: "Dec 20, 2023",
    image: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?q=80&w=800&auto=format&fit=crop",
    link: "/events/cultural-fest"
  },
  {
    id: 3,
    name: "Annual Sports Day",
    description: "Competitive sports events and athletic championships.",
    date: "Jan 5, 2024",
    image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?q=80&w=800&auto=format&fit=crop",
    link: "/events/sports-day"
  }
]

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <section className="container mx-auto px-4 py-8">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
            Welcome to UNI CLUB
          </h1>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            Join our vibrant community of clubs and events. Discover new interests, develop skills, and connect with like-minded people.
          </p>
        </div>
      </section>

      <section className="container mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold mb-8">Featured Clubs</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredClubs.map((club) => (
            <Link key={club.id} href={club.link} className="hover-zoom">
              <Card className="h-full bg-card">
                <div className="relative h-48 w-full">
                  <Image
                    src={club.image}
                    alt={club.name}
                    fill
                    priority
                    className="object-cover rounded-t-lg"
                  />
                </div>
                <CardHeader>
                  <CardTitle>{club.name}</CardTitle>
                  <CardDescription>{club.description}</CardDescription>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      <section className="container mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold mb-8">Upcoming Events</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {upcomingEvents.map((event) => (
            <Link key={event.id} href={event.link} className="hover-zoom">
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
                    <div className="mt-2 text-primary font-medium">
                      {event.date}
                    </div>
                  </CardDescription>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      <section className="relative py-12">
        <div className="absolute inset-0 bg-gradient-to-b from-background to-muted/50" />
        <div className="container relative mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold tracking-tight mb-4">
              Ready to Get Involved?
            </h2>
            <p className="text-muted-foreground mb-8">
              Join our community today and be part of something amazing.
            </p>
            <div className="flex justify-center gap-4">
              <Button asChild size="lg" variant="default">
                <Link href="/clubs">
                  Explore Clubs
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/events">
                  View Events
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
