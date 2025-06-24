'use client';
import { useRouter } from 'next/navigation';
import React from 'react';

export function CloseButton() {
  const router = useRouter();
  return (
    <button
      onClick={() => router.back()}
      className="absolute top-4 right-4 z-20 bg-black/50 p-2 rounded-full text-2xl text-[#f5e8c7] hover:text-white hover:bg-black focus:outline-none"
      aria-label="Close"
    >
      &times;
    </button>
  );
}
