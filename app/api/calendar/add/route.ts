import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { prisma } from "@/lib/prisma"

export async function POST(req: Request) {
  try {
    const session = await getServerSession()
    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const body = await req.json()
    const { eventId, userId, eventDetails } = body

    // Check if event is already added
    const existingEvent = await prisma.userEvent.findFirst({
      where: {
        userId,
        eventId,
      },
    })

    if (existingEvent) {
      return new NextResponse("Event already added to calendar", { status: 400 })
    }

    // Add event to user's calendar
    await prisma.userEvent.create({
      data: {
        userId,
        eventId,
        status: "ATTENDING",
        addedAt: new Date(),
      },
    })

    return new NextResponse("Event added to calendar", { status: 200 })
  } catch (error) {
    console.error("[CALENDAR_ADD]", error)
    return new NextResponse("Internal Error", { status: 500 })
  }
} 