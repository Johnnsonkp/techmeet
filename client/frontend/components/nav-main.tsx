"use client"

import { ChevronRight, type LucideIcon } from "lucide-react"
import { useRouter } from 'next/navigation'

import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

type NavItem = {
  title: string
  url: string
  icon?: LucideIcon
  isActive?: boolean
  items?: {
    title: string
    url: string
  }[]
}

export function NavMain({items, active}: {
  items: {
    title: string
    url: string
    icon?: LucideIcon
    isActive?: boolean
    items?: {
      title: string
      url: string
    }[]
  }[]
  active: string
}) {
  const router = useRouter()

  const seperatePaths = (item: NavItem) => {
    const segmentedPath = item.url.split('/').filter(Boolean);
    const segment = segmentedPath[1] ||  segmentedPath[0];

    return segment
  }

  const handleNavigation = (item: NavItem) => {
    const segmentedPath = seperatePaths(item)

    if(active !== segmentedPath){
      if(segmentedPath !== 'dashboard'){
        return router.push(`/dashboard/${segmentedPath}`)
      }
      return router.push(`/dashboard/`)
    }
  }

  return (
    <SidebarGroup className="">
      <SidebarMenu>
        {items.map((item, index) => (
          <SidebarMenuItem key={index}>
            <SidebarMenuButton
              onClick={(e) => handleNavigation(item)} 
              tooltip={item.title}
              size={'lg'}
              isActive={active == seperatePaths(item)}
              className={'cursor-pointer'}
            >
              <span className={`w-[30px] ${active == seperatePaths(item)? 'text-[#0152FF]' : 'text-[#777777a6]'}`}>
                {item.icon && <item.icon />}
              </span>
              <span className={`${active == seperatePaths(item)? 'text-[#0152FF]': 'text-[#777]' }`}>{item.title}</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
        </SidebarMenu>
    </SidebarGroup>
  )  
}
