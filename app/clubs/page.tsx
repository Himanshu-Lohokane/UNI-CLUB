import { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export const metadata: Metadata = {
  title: "Clubs - MIT AOE",
  description: "Discover clubs and organizations at MIT AOE",
}

// Club data organized by category
const clubCategories = [
  {
    name: "Academic",
    clubs: [
      {
        id: "robotics",
        name: "Robotics Club",
        image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=800&auto=format&fit=crop",
        description: "Build and program robots for competitions and projects.",
      },
      {
        id: "ieee",
        name: "IEEE Student Branch",
        image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=800&auto=format&fit=crop",
        description: "Professional organization dedicated to advancing technology.",
      },
      {
        id: "astronomy",
        name: "Astronomy Club",
        image: "https://images.unsplash.com/photo-1538370965046-79c0d6907d47?q=80&w=800&auto=format&fit=crop",
        description: "Explore the cosmos through stargazing and astrophotography.",
      },
    ],
  },
  {
    name: "Arts",
    clubs: [
      {
        id: "photography",
        name: "Photography Club",
        image: "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?q=80&w=800&auto=format&fit=crop",
        description: "Capture moments and learn photography techniques.",
      },
      {
        id: "dance",
        name: "Dance Club",
        image: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?q=80&w=800&auto=format&fit=crop",
        description: "Express yourself through various dance forms.",
      },
      {
        id: "music",
        name: "Music Club",
        image: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=80&w=800&auto=format&fit=crop",
        description: "Showcase your musical talents through performances.",
      },
    ],
  },
  {
    name: "Sports",
    clubs: [
      {
        id: "cricket",
        name: "Cricket Club",
        image: "https://images.unsplash.com/photo-1531415074968-036ba1b575da?q=80&w=800&auto=format&fit=crop",
        description: "Join the cricket team and participate in tournaments.",
      },
      {
        id: "football",
        name: "Football Club",
        image: "https://images.unsplash.com/photo-1553778263-73a83bab9b0c?q=80&w=800&auto=format&fit=crop",
        description: "Be part of the football team and compete in inter-college events.",
      },
      {
        id: "badminton",
        name: "Badminton Club",
        image: "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?q=80&w=800&auto=format&fit=crop",
        description: "Sharpen your badminton skills and compete in tournaments.",
      },
    ],
  },
  {
    name: "Technology",
    clubs: [
      {
        id: "coding",
        name: "Coding Club",
        image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop",
        description: "Enhance your programming skills and participate in hackathons.",
      },
      {
        id: "ai-ml",
        name: "AI/ML Club",
        image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=800&auto=format&fit=crop",
        description: "Explore artificial intelligence and machine learning.",
      },
      {
        id: "iot",
        name: "IoT Club",
        image: "https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?q=80&w=800&auto=format&fit=crop",
        description: "Work on Internet of Things projects and innovations.",
      },
    ],
  },
  {
    name: "Social",
    clubs: [
      {
        id: "community-service",
        name: "Community Service Club",
        image: "https://images.unsplash.com/photo-1593113630400-ea4288922497?q=80&w=800&auto=format&fit=crop",
        description: "Contribute to society through volunteering and service.",
      },
      {
        id: "environment",
        name: "Environmental Club",
        image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=800&auto=format&fit=crop",
        description: "Promote sustainability and environmental awareness.",
      },
      {
        id: "debate",
        name: "Debate Club",
        image: "https://images.unsplash.com/photo-1529448005898-b19fc13465b7?q=80&w=800&auto=format&fit=crop",
        description: "Enhance your public speaking and critical thinking skills.",
      },
    ],
  },
]

export default function ClubsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Clubs and Organizations</h1>
      <p className="text-gray-600 mb-8 max-w-3xl">
        Discover clubs and organizations at MIT AOE. Join a community that shares your interests and pursue your passions outside the classroom.
      </p>

      {clubCategories.map((category) => (
        <div key={category.name} className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">{category.name} Clubs</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {category.clubs.map((club) => (
              <Link key={club.id} href={`/clubs/${club.id}`} className="hover-zoom">
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
                      </div>
      ))}
    </div>
  )
}
