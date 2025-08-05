
'use client'

import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card'
import { useEffect } from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
        <Card className="w-full max-w-md text-center">
            <CardHeader>
                <CardTitle className="text-2xl font-bold text-destructive">Application Error</CardTitle>
                <CardDescription>
                    Something went wrong. Please try again.
                </CardDescription>
            </CardHeader>
            <CardContent>
               <p className="text-sm text-muted-foreground">We've been notified of the issue and are working to resolve it.</p>
               {error?.message && <p className="mt-4 text-xs bg-muted p-2 rounded-md font-mono">{error.message}</p>}
            </CardContent>
            <CardFooter className="flex justify-center">
                <Button
                    onClick={
                    // Attempt to recover by trying to re-render the segment
                    () => reset()
                    }
                >
                    Try again
                </Button>
            </CardFooter>
        </Card>
    </div>
  )
}
