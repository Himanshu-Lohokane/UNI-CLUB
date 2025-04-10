"use client"

import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Calendar, Clock, MapPin, Users } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

export default function ClubPage({ params }: { params: { id: string } }) {
  const club = clubsData.find((c) => c.id === params.id) || clubsData[0]
  const [isMember, setIsMember] = useState(false)

  const toggleMembership = () => {
    setIsMember(!isMember)
  }

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
            <Button onClick={toggleMembership} variant={isMember ? "outline" : "default"}>
              {isMember ? "Leave Club" : "Join Club"}
            </Button>
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
                              {event.date}
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

                <h2 className="text-xl font-semibold mb-3">Members</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {club.members.map((member) => (
                    <div key={member.id} className="flex flex-col items-center text-center">
                      <Avatar className="h-16 w-16 mb-2">
                        <AvatarImage src={member.avatar} alt={member.name} />
                        <AvatarFallback>{member.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                      </Avatar>
                      <h4 className="text-sm font-medium">{member.name}</h4>
                    </div>
                  ))}
                </div>
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
                        <div className="font-bold text-primary">{event.date.split(" ")[0]}</div>
                        <div className="text-sm text-muted-foreground">{event.date.split(" ")[1]}</div>
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
                {relatedClubs.map((relatedClub) => (
                  <Link href={`/clubs/${relatedClub.id}`} key={relatedClub.id} className="block">
                    <div className="flex items-center gap-3">
                      <Avatar>
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

// Update the clubsData array to use the new images
const clubsData = [
  {
    id: "1",
    name: "Photography Club",
    description:
      "Explore the art of photography with like-minded enthusiasts. Our club welcomes photographers of all skill levels, from beginners to advanced. We organize workshops, photo walks, and exhibitions throughout the academic year.",
    mission:
      "To foster creativity and technical skills in photography while building a community of passionate photographers on campus.",
    image: "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?q=80&w=800&auto=format&fit=crop",
    bannerImage: "https://images.unsplash.com/photo-1525909002-1b05e0c869d8?q=80&w=800&auto=format&fit=crop",
    logo: "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?q=80&w=200&auto=format&fit=crop",
    memberCount: 120,
    category: "Arts",
    founded: "2015",
    email: "photo@university.edu",
    meetingDay: "Every Tuesday",
    meetingTime: "6:00 PM - 8:00 PM",
    meetingLocation: "Arts Building, Room 302",
    socialMedia: [
      { platform: "Instagram", url: "https://instagram.com" },
      { platform: "Facebook", url: "https://facebook.com" },
      { platform: "Twitter", url: "https://twitter.com" },
    ],
    leaders: [
      { id: "l1", name: "Emma Johnson", role: "President", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop" },
      { id: "l2", name: "Michael Chen", role: "Vice President", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop" },
      { id: "l3", name: "Sophia Rodriguez", role: "Treasurer", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&auto=format&fit=crop" },
    ],
    members: [
      { id: "m1", name: "Alex Kim", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop" },
      { id: "m2", name: "Taylor Smith", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop" },
      { id: "m3", name: "Jordan Lee", avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=200&auto=format&fit=crop" },
      { id: "m4", name: "Casey Brown", avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=200&auto=format&fit=crop" },
      { id: "m5", name: "Riley Johnson", avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=200&auto=format&fit=crop" },
      { id: "m6", name: "Jamie Wilson", avatar: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=200&auto=format&fit=crop" },
      { id: "m7", name: "Quinn Davis", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop" },
      { id: "m8", name: "Morgan White", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop" },
    ],
    events: [
      {
        id: "e1",
        name: "Photography Exhibition",
        description: "Annual showcase of student photography work with guest speakers.",
        image: "https://images.unsplash.com/photo-1525909002-1b05e0c869d8?q=80&w=800&auto=format&fit=crop",
        date: "Apr 15",
        time: "3:00 PM - 7:00 PM",
        location: "Student Center Gallery",
      },
      {
        id: "e2",
        name: "Portrait Photography Workshop",
        description: "Learn techniques for capturing compelling portraits.",
        image: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?q=80&w=800&auto=format&fit=crop",
        date: "Apr 22",
        time: "4:00 PM - 6:00 PM",
        location: "Arts Building, Room 302",
      },
      {
        id: "e3",
        name: "Campus Photo Walk",
        description: "Explore and photograph beautiful spots around campus.",
        image: "https://images.unsplash.com/photo-1525909002-1b05e0c869d8?q=80&w=800&auto=format&fit=crop",
        date: "May 5",
        time: "5:30 PM - 7:30 PM",
        location: "Meet at University Fountain",
      },
    ],
    gallery: [
      "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1525909002-1b05e0c869d8?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1525909002-1b05e0c869d8?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?q=80&w=800&auto=format&fit=crop",
    ],
  },
  {
    id: "2",
    name: "Robotics Club",
    description: "Build and program robots, participate in competitions, and explore the future of automation.",
    mission: "To advance robotics education and innovation through hands-on projects and competitive challenges.",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=800&auto=format&fit=crop",
    bannerImage: "https://images.unsplash.com/photo-1561557944-6e7860d1a7eb?q=80&w=800&auto=format&fit=crop",
    logo: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=200&auto=format&fit=crop",
    memberCount: 85,
    category: "Technology",
    founded: "2018",
    email: "robotics@university.edu",
    meetingDay: "Every Wednesday",
    meetingTime: "5:00 PM - 7:00 PM",
    meetingLocation: "Engineering Building, Lab 201",
    socialMedia: [
      { platform: "Instagram", url: "https://instagram.com" },
      { platform: "Twitter", url: "https://twitter.com" }
    ],
    leaders: [
      { id: "l4", name: "David Park", role: "President", avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=200&auto=format&fit=crop" },
      { id: "l5", name: "Sarah Lee", role: "Vice President", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop" }
    ],
    members: [
      { id: "m9", name: "James Wilson", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop" },
      { id: "m10", name: "Emily Chen", avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=200&auto=format&fit=crop" },
      { id: "m11", name: "Michael Brown", avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=200&auto=format&fit=crop" }
    ],
    events: [
      {
        id: "e4",
        name: "Robot Building Workshop",
        description: "Learn to build and program a basic robot.",
        image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=800&auto=format&fit=crop",
        date: "Apr 18",
        time: "2:00 PM - 5:00 PM",
        location: "Engineering Lab 201"
      },
      {
        id: "e5",
        name: "Robotics Competition Prep",
        description: "Team practice for upcoming robotics competition.",
        image: "https://images.unsplash.com/photo-1561557944-6e7860d1a7eb?q=80&w=800&auto=format&fit=crop",
        date: "Apr 25",
        time: "4:00 PM - 7:00 PM",
        location: "Engineering Lab 201"
      }
    ],
    gallery: [
      "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1561557944-6e7860d1a7eb?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1535378917042-10a22c95931a?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=800&auto=format&fit=crop"
    ]
  },
  {
    id: "3",
    name: "Coding Club",
    description: "Learn programming, develop applications, and collaborate on exciting tech projects.",
    mission: "To foster coding skills and create innovative software solutions while building a supportive tech community.",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop",
    bannerImage: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=800&auto=format&fit=crop",
    logo: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=200&auto=format&fit=crop",
    memberCount: 150,
    category: "Technology",
    founded: "2016",
    email: "coding@university.edu",
    meetingDay: "Every Monday",
    meetingTime: "6:30 PM - 8:30 PM",
    meetingLocation: "Computer Science Building, Room 405",
    socialMedia: [
      { platform: "Twitter", url: "https://twitter.com" },
      { platform: "Instagram", url: "https://instagram.com" },
      { platform: "Facebook", url: "https://facebook.com" }
    ],
    leaders: [
      { id: "l6", name: "Ryan Zhang", role: "President", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop" },
      { id: "l7", name: "Jessica Kim", role: "Vice President", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop" }
    ],
    members: [
      { id: "m12", name: "Tom Anderson", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop" },
      { id: "m13", name: "Lisa Chen", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop" },
      { id: "m14", name: "Mark Davis", avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=200&auto=format&fit=crop" }
    ],
    events: [
      {
        id: "e6",
        name: "Web Development Workshop",
        description: "Learn modern web development with React and Next.js.",
        image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop",
        date: "Apr 22",
        time: "5:00 PM - 7:00 PM",
        location: "CS Building 405"
      },
      {
        id: "e7",
        name: "Hackathon Prep Session",
        description: "Preparation for upcoming university hackathon.",
        image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=800&auto=format&fit=crop",
        date: "Apr 29",
        time: "3:00 PM - 6:00 PM",
        location: "CS Building 405"
      }
    ],
    gallery: [
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1516116216624-53e697fedbea?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1522542550221-31fd19575a2d?q=80&w=800&auto=format&fit=crop"
    ]
  }
]

const relatedClubs = [
  {
    id: "2",
    name: "Film Club",
    logo: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?q=80&w=200&auto=format&fit=crop",
    category: "Arts",
  },
  {
    id: "3",
    name: "Digital Media Club",
    logo: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=200&auto=format&fit=crop",
    category: "Arts",
  },
  {
    id: "4",
    name: "Graphic Design Club",
    logo: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?q=80&w=200&auto=format&fit=crop",
    category: "Arts",
  },
]
