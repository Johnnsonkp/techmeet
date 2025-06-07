import Link from 'next/link';
import React from 'react'

export default function BottomBar() {

  return (
    <div className="flex flex-col md:inline-flex md:flex-row rounded-xl md:rounded-full shadow-xl md:whitespace-nowrap text-center bg-gray-900 p-4 md:pr-2 md:pl-6 md:py-2 text-white text-sm lg:text-base mt-6 font-mono gap-4 items-center selection:bg-blue selection:text-white">
      <span>
        Working routes:
      </span>
      <Link
        className="!text-white flex items-center gap-2 relative cursor-pointer bg-blue md:aspect-square px-4 py-0 md:p-2 rounded-xl md:rounded-full hover:bg-yellow hover:text-black transition-colors duration-300"
        href={'/auth'}
      >
        Sign in
      </Link>
      <Link
        className="!text-white flex items-center gap-2 relative cursor-pointer bg-blue md:aspect-square px-4 py-0 md:p-2 rounded-xl md:rounded-full hover:bg-yellow hover:text-black transition-colors duration-300"
        href={'/'}
      >
        Sign up
      </Link>
    </div>
  );
}