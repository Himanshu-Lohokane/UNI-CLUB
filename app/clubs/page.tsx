import { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { clubsData } from "@/data/clubs"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export const metadata: Metadata = {
  title: "Clubs - MIT AOE",
  description: "Discover clubs and organizations at MIT AOE",
}

// Group clubs by category
const groupClubsByCategory = () => {
  const categories = {};
  
  clubsData.forEach(club => {
    if (!categories[club.category]) {
      categories[club.category] = [];
    }
    categories[club.category].push({
      id: club.id,
      name: club.name,
      image: club.image || "/placeholder.svg",
      description: club.description
    });
  });
  
  return Object.entries(categories).map(([name, clubs]) => ({
    name,
    clubs
  }));
};

const clubCategories = groupClubsByCategory();

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
