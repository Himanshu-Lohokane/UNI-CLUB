"use client"

import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Bell, Calendar, Clock, User, Users } from "lucide-react"
import Link from "next/link"

export default function DashboardPage() {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/signin")
    }
  }, [status, router])

  if (status === "loading") {
    return <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
    </div>
  }

  // Mock data for dashboard
  const myClubs = [
    { id: "robotics", name: "Robotics Club", role: "Member", image: "https://placekitten.com/800/600" },
    { id: "photography", name: "Photography Club", role: "Admin", image: "https://placekitten.com/801/601" },
  ]

  const upcomingEvents = [
    { id: "1", name: "Hackathon 2023", date: "Dec 15", time: "9:00 AM", location: "Main Auditorium" },
    { id: "2", name: "Cultural Fest", date: "Dec 20", time: "5:00 PM", location: "Open Air Theatre" },
  ]

  const notifications = [
    { id: "1", message: "New announcement in Robotics Club", time: "2 hours ago" },
    { id: "2", message: "Photography Club meeting rescheduled", time: "Yesterday" },
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="md:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xl">Welcome, {session?.user?.name}!</CardTitle>
            <Avatar className="h-12 w-12">
              {session?.user?.image ? (
                <AvatarImage src={session.user.image} alt={session.user.name || "User"} />
              ) : (
                <AvatarFallback>{session?.user?.name?.charAt(0) || "U"}</AvatarFallback>
              )}
            </Avatar>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              This is your dashboard where you can manage your clubs, events, and more.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-center">
                <div className="p-2 rounded-full bg-primary/10 mr-3">
                  <Users className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium">My Clubs</p>
                  <p className="text-2xl font-bold">{myClubs.length}</p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="p-2 rounded-full bg-primary/10 mr-3">
                  <Calendar className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium">Upcoming Events</p>
                  <p className="text-2xl font-bold">{upcomingEvents.length}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Notifications</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {notifications.length > 0 ? (
                notifications.map((notification) => (
                  <div key={notification.id} className="flex items-start gap-3">
                    <Bell className="h-4 w-4 text-muted-foreground mt-1" />
                    <div>
                      <p className="text-sm">{notification.message}</p>
                      <p className="text-xs text-muted-foreground">{notification.time}</p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-muted-foreground">No new notifications</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>My Clubs</CardTitle>
            <CardDescription>Clubs you are a member of</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {myClubs.map((club) => (
                <Link key={club.id} href={`/clubs/${club.id}`} className="flex items-center gap-4 hover:bg-muted p-2 rounded-lg transition-colors">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={club.image} alt={club.name} />
                    <AvatarFallback>{club.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="font-medium">{club.name}</p>
                    <p className="text-xs text-muted-foreground">{club.role}</p>
                  </div>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Upcoming Events</CardTitle>
            <CardDescription>Events you are registered for</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingEvents.map((event) => (
                <Link key={event.id} href={`/events/${event.id}`} className="flex gap-3 hover:bg-muted p-2 rounded-lg transition-colors">
                  <div className="min-w-[60px] text-center">
                    <div className="font-bold text-primary">{event.date.split(" ")[0]}</div>
                    <div className="text-xs text-muted-foreground">{event.date.split(" ")[1]}</div>
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{event.name}</p>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                      <Clock className="h-3 w-3" />
                      <span>{event.time}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 