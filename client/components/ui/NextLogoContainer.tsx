import Image from 'next/image'
import React from 'react'

function NextLogoContainer() {
  return (
    <>
      <a
        className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
        href="https://vercel.com?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Image
          src="/next.svg"
          alt="Vercel Logo"
          className="dark:invert"
          width={150}
          height={48}
          priority
        />
      </a>
    </>
  )
}

export default NextLogoContainer