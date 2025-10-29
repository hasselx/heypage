import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function SignUpSuccessPage() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10 bg-gradient-to-br from-purple-50 to-blue-50">
      <div className="w-full max-w-sm">
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Check your email</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <p className="text-gray-600 text-center">
              We&apos;ve sent you a confirmation email. Please check your inbox and click the link to verify your
              account.
            </p>
            <p className="text-sm text-gray-500 text-center">
              Once confirmed, you can log in and start creating your link page.
            </p>
            <Link href="/auth/login" className="w-full">
              <Button className="w-full bg-purple-600 hover:bg-purple-700">Back to Login</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
