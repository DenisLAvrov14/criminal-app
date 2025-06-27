// components/BackButton.tsx
'use client';

import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';

export default function BackButton() {
  const router = useRouter();
  return (
    <button
      onClick={() => router.back()}
      className="
        inline-flex items-center
        text-[#f5e8c7] hover:text-white
        transition-colors duration-200
        font-medium
      "
    >
      <ArrowLeft className="mr-2 h-5 w-5" />
      Back
    </button>
  );
}
