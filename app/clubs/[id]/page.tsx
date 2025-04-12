import { Metadata } from "next"
import ClubContent from "./club-content"

export const metadata: Metadata = {
  title: "Club Details - MIT AOE",
  description: "View details about this club",
}

export default function ClubPage({ params }: { params: { id: string } }) {
  return <ClubContent id={params.id} />
}
