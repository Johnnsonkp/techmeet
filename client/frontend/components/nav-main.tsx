"use client"

import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

import Link from "next/link"
import type { LucideIcon } from "lucide-react"
import { useRouter } from 'next/navigation'

type NavItem = {
  title: string
  url: string
  icon?: LucideIcon
  isActive?: boolean
  pathSegment?: string
}

export function NavMain({ items }: { items: NavItem[] }) {
  
  const handleNavigation = (e: any) => {
    const body = document.getElementById("userdDashboard")

    e.target.classList.add('nav-item-select')     
     if(body){
      body.classList.add('page-transition')
     }
  }

  const NavButton = ({item}: {item: NavItem}) => {
    return (
      <Link
        onClick={(e) => handleNavigation(e)}
        href={item.url}
        className={
          item.isActive ? 
          'flex align-middle item-title text-[#0152FF] bg-[#F5F5F5] w-[100%] py-3 rounded-lg z-20 ' : 
          'flex align-middle text-[#777] w-[100%] py-3 rounded-lg z-20 '
        } 
      >
        <span className={`item-icon w-[30px] mr-1 ${item.isActive ? "opacity-100" : "opacity-65"}`}>
        {/* <span className={`item-icon w-[30px] mr-1`}> */}
          {item.icon && <item.icon/>}
        </span>
        {item.title}
      </Link>
    )
  }

  return (
    <SidebarGroup>
      <SidebarMenu>
        {items.map((item, index) => (
          <SidebarMenuItem key={index}>
            <SidebarMenuButton className="cursor-pointer my-1"  size="default" tooltip={item.title}>
              <NavButton item={item} />
            </SidebarMenuButton> 
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  )
}