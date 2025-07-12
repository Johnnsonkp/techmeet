'use client';

import { useEffect, useState } from 'react';

import { BreadcrumbLink } from './breadcrumb';
import { usePathname } from 'next/navigation';

export default function PathDisplay() {
  const pathname = usePathname();

  // Split the pathname by "/" and filter out empty strings
  const segments = pathname.split('/').filter(Boolean);
  
  return (
    <BreadcrumbLink href={pathname}>
      {segments[1] || "home"}
    </BreadcrumbLink>
  )
}

export function pathName(){
  const pathname = usePathname();
  const segments = pathname.split('/').filter(Boolean);

  return segments[1]
}

export function dynamicPath(){
  const [path, setPath] = useState('');

  const pathname = usePathname();
  const segments = pathname.split('/').filter(Boolean);

  useEffect(() => {
    console.log("pathname", pathname)
    setPath(pathname)
  }, [])

  return path
}