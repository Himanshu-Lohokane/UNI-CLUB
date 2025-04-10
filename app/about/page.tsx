import { Metadata } from "next"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export const metadata: Metadata = {
  title: "About - MIT AOE Clubs and Events",
  description: "Learn about MIT AOE and its vibrant club culture",
}

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">About MIT AOE Clubs and Events</h1>
        
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
          <p className="text-muted-foreground mb-4">
            At MIT Academy of Engineering, we believe in fostering a vibrant campus life through our diverse range of clubs and events. Our platform serves as a central hub for students to discover, join, and participate in various activities that complement their academic journey.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Club Categories</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Academic Clubs</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Enhance your technical knowledge and skills through our academic clubs focused on various engineering disciplines.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Cultural Clubs</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Celebrate diversity and showcase your talents through music, dance, drama, and other cultural activities.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Sports Clubs</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Stay active and competitive with our range of sports clubs, from traditional games to modern sports.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Technical Clubs</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Explore cutting-edge technologies and innovations through our technical clubs and workshops.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Events</h2>
          <p className="text-muted-foreground mb-4">
            Our platform hosts a variety of events throughout the academic year, including:
          </p>
          <ul className="list-disc pl-6 text-muted-foreground space-y-2">
            <li>Technical symposiums and workshops</li>
            <li>Cultural festivals and competitions</li>
            <li>Sports tournaments and matches</li>
            <li>Guest lectures and industry interactions</li>
            <li>Hackathons and coding competitions</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Get Involved</h2>
          <p className="text-muted-foreground">
            Join our vibrant community of students and make the most of your college experience. Whether you're looking to develop new skills, pursue your passions, or make new friends, there's a place for everyone at MIT AOE.
          </p>
        </section>
      </div>
    </div>
  )
} 