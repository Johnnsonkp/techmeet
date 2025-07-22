// ClientWrapper.tsx
'use client';

import React from 'react';
import { usePathname } from 'next/navigation';

export function HeaderClientWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isScrolling, setIsScrolling] = React.useState(false);

  React.useEffect(() => {
    function handleScroll() {
      if (window.scrollY > 0) {
        setIsScrolling(true);
      } else {
        setIsScrolling(false);
      }
    }

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // let headerClass = "fixed z-50 h-19 inset-0 flex items-center backdrop-blur-sm ";
  let headerClass = "fixed z-50 h-19 inset-0 flex items-center";
  if (pathname === "/") {
    headerClass += isScrolling ? " bg-white/80 text-black" : " transparent text-white";
  } else {
    headerClass += " bg-white/80 text-black";
  }

  if (pathname.includes('/auth')) {
    return null;
  }
  return <header className={headerClass}>{children}</header>;
}