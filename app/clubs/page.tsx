import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Define the data
const allClubs = [
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
  {
    id: "4",
    name: "Chess Club",
    description: "Learn strategies and compete in chess tournaments.",
    image: "/placeholder.svg",
    memberCount: 42,
    category: "Academic",
  },
  {
    id: "5",
    name: "Basketball Club",
    description: "Practice and play basketball in a friendly environment.",
    image: "/placeholder.svg",
    memberCount: 78,
    category: "Sports",
  },
  {
    id: "6",
    name: "Environmental Society",
    description: "Promote sustainability and environmental awareness on campus.",
    image: "/placeholder.svg",
    memberCount: 93,
    category: "Social",
  },
]

export default function ClubsPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <header className="mb-8">
        <h1 className="text-3xl font-bold mb-4">University Clubs</h1>
        <p className="text-muted-foreground mb-6">Discover and join clubs that match your interests</p>
        <div className="flex max-w-md gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input type="search" placeholder="Search clubs..." className="pl-8" />
          </div>
          <Button>Search</Button>
        </div>
      </header>

      <Tabs defaultValue="all" className="mb-8">
        <TabsList>
          <TabsTrigger value="all">All Clubs</TabsTrigger>
          <TabsTrigger value="academic">Academic</TabsTrigger>
          <TabsTrigger value="arts">Arts</TabsTrigger>
          <TabsTrigger value="sports">Sports</TabsTrigger>
          <TabsTrigger value="technology">Technology</TabsTrigger>
          <TabsTrigger value="social">Social</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {allClubs.map((club) => (
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
        </TabsContent>
        {/* Other tab contents would be similar but filtered by category */}
        <TabsContent value="academic" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {allClubs
              .filter((club) => club.category === "Academic")
              .map((club) => (
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
        </TabsContent>
        {/* Similar TabsContent for other categories */}
      </Tabs>
    </div>
  )
}
