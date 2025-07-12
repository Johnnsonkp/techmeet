'use client'

import React from 'react'
import { usePathname } from 'next/navigation'

function HeaderUnderline() {
  const pathname = usePathname()

  return (
    pathname.includes("/dashboard")? <hr className="w-full relative mt-2 "></hr> : ""
  )
}

export default HeaderUnderline