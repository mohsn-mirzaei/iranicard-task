'use client' // Error boundaries must be Client Components
 
import { Button } from '@/components/ui/button'
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
    <div className='flex h-screen items-center justify-center flex-col space-y-4'>
      <h2>خطایی رخ داده است!</h2>
      <Button
      variant={"secondary"}
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
      >
        تلاش دوباره
      </Button>
    </div>
  )
}