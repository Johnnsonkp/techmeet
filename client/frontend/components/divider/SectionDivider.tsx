'use client'

import React from 'react'
import { usePathname } from 'next/navigation'

function SectionDivider() {
  const pathname = usePathname();

  // Show divider only on homepage
  return pathname !== "/" && pathname !== "/auth"  ? <div className="pt-20"></div> : null;
}

export default SectionDivider