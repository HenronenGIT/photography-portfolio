import Link from 'next/link';

import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-neutral-50 px-8">
      <div className="text-center">
        <h1 className="mb-4 text-6xl font-light text-neutral-900">404</h1>
        <p className="mb-8 text-xl text-neutral-600">Page not found</p>
        <Link href="/">
          <Button variant="outline" className="px-8 py-3">
            Return Home
          </Button>
        </Link>
      </div>
    </div>
  );
}
