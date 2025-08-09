'use client'


import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function ThankYouPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const nextPath = searchParams.get('next');

  useEffect(() => {
    const timer = setTimeout(() => {
      if (nextPath) {
        router.push(`/${nextPath}`);
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, [nextPath, router]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
            <div className="text-center py-16">
                <h1 className="text-3xl font-bold">🎉 Thank you for registering!</h1>
                <p className="mt-4 text-gray-600">Redirecting to your profile...</p>
            </div>
        </div >
    );
}
