import { buttonVariants } from '@/components/ui/button'
import Link from 'next/link'
 
export default function NotFound() {
  return (
    <div className='flex h-screen items-center justify-center flex-col'>
      <h2>پیدا نشد! ۴۰۴</h2>
      <p>صفحه مورد نظر پیدا نشد!</p>
      <Link href="/" className={buttonVariants({variant: "link"})}>بازگشت به خانه</Link>
    </div>
  )
}