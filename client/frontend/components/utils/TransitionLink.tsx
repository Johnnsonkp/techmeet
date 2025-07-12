'use client';

import Link, {LinkProps} from 'next/link'
import React, {ReactNode} from 'react'

import { useRouter } from 'next/navigation';

interface TransitionLinkProps extends LinkProps {
  children: ReactNode;
  href: string;
  className: string;
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export const TransitionLink = ({children, href, className, ...props} : TransitionLinkProps) => {
  const router = useRouter();

  const handleTransition = async (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();

    const body = document.querySelector("body")
    body?.classList.add('page-transition')

    await sleep(200);

    router.push(href);

    await sleep(200);
    body?.classList.remove('page-transition')

  }
  return (
    <Link
      className={className}
      onClick={e => {
        handleTransition(e)
      }}
      href={href} 
      {...props}
    >{children}</Link>
  )
}