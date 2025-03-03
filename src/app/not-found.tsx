import { buttonVariants } from '@/components/ui/button'
import Link from 'next/link'
 
export default function NotFound() {
  return (
    <div className='flex h-screen items-center justify-center flex-col'>
      <h2>Not Found</h2>
      <p>Could not find requested resource</p>
      <Link href="/" className={buttonVariants({variant: "link"})}>Return Home</Link>
    </div>
  )
}