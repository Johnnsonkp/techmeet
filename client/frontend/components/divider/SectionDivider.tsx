'use client'

import React from 'react'
import { usePathname } from 'next/navigation'

function SectionDivider() {
  const pathname = usePathname();

  return pathname !== "/" && !pathname.includes("/auth")  ? <div className="pt-20"></div> : null;
}

export default SectionDivider