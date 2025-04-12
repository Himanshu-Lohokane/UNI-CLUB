import { Metadata } from "next"
import EventsPage from "./events-client"

export const metadata: Metadata = {
  title: "Events - MIT AOE",
  description: "Upcoming events at MIT AOE",
}

export default function Page() {
  return <EventsPage />
}
