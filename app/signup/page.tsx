import { Metadata } from "next"
import SignUpContent from "./signup-content"

export const metadata: Metadata = {
  title: "Sign Up",
  description: "Create a new account",
}

export default function SignUpPage() {
  return <SignUpContent />
} 