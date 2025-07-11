"use client"

import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

import Link from "next/link"
import type { LucideIcon } from "lucide-react"

type NavItem = {
  title: string
  url: string
  icon?: LucideIcon | any
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
          'flex align-middle item-title text-[#4361ee] bg-[#e6ebff] w-[100%] py-3 rounded-lg z-20 ' : 
          'flex align-middle w-[100%] text-[#333] py-12 rounded-lg z-20 '
        }
      >
        <span className={`pt-[0.7] item-icon min-w-0 px-2 mr-2 ${!item.isActive && 'opacity-70'}`}>
          {item.icon && <item.icon className="size-[18px]"/>}
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
            <SidebarMenuButton className="my-[0.5] cursor-pointer p-0" size="default" tooltip={item.title}>
              <NavButton item={item} />
            </SidebarMenuButton> 
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  )
}