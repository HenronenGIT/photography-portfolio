import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-neutral-50 flex items-center justify-center px-8">
      <div className="text-center">
        <h1 className="text-6xl font-light text-neutral-900 mb-4">404</h1>
        <p className="text-xl text-neutral-600 mb-8">Page not found</p>
        <Link href="/">
          <Button variant="outline" className="px-8 py-3">
            Return Home
          </Button>
        </Link>
      </div>
    </div>
  )
}