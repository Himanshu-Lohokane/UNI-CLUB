import { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Error",
  description: "Authentication error occurred",
}

export default function ErrorPage({
  searchParams,
}: {
  searchParams: { error?: string }
}) {
  const error = searchParams.error

  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            Authentication Error
          </h1>
          <p className="text-sm text-muted-foreground">
            {error === "AccessDenied"
              ? "You do not have permission to sign in"
              : "An error occurred during sign in"}
          </p>
        </div>
        <div className="flex justify-center">
          <Link
            href="/auth/signin"
            className="text-sm text-muted-foreground hover:text-brand"
          >
            Return to sign in
          </Link>
        </div>
      </div>
    </div>
  )
} 