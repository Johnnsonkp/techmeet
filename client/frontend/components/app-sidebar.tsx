"use client"

import * as React from "react"

import {
  AudioWaveform,
  BookOpen,
  Bot,
  Calendar,
  Command,
  Frame,
  GalleryVerticalEnd,
  Home,
  Map,
  PieChart,
  SectionIcon,
  Settings2,
  SquareTerminal,
  User
} from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import { useEffect, useState } from "react"

import { NavMain } from "@/components/nav-main"
import { usePathname } from 'next/navigation'

const data = {
  navMain: [
    {
      title: "Home",
      url: "/dashboard",
      icon: Home,
      isActive: false,
    },
    {
      title: "My Events",
      url: "/dashboard/my_events",
      icon: Frame,
      isActive: false,
    },
    {
      title: "Calendar",
      url: "/dashboard/calendar",
      icon: Calendar,
      isActive: false,
    },
    {
      title: "Roadmap",
      url: "/dashboard/roadmap",
      icon: Map,
      isActive: false,
    },
    {
      title: "Event Spaces",
      url: "/dashboard/event_spaces",
      icon: SectionIcon,
      isActive: false,
    },
    {
      title: "User Profile",
      url: "/dashboard/user_profile",
      icon: User,
      isActive: false,
    },
  ],
}


export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const [active, setActive] = useState<string>('')
  const pathname = usePathname()

  useEffect(() => {
    if(pathname){
      const segments = pathname.split('/').filter(Boolean);
      const newActive = segments[1] || segments[0] || ''

      if (newActive !== active) {
        setActive(newActive)
      }
    }
  }, [pathname, active])
  
  return (
    <Sidebar collapsible="icon" {...props} className="mt-24 border-t-2">
      <SidebarHeader>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} active={active}/>
      </SidebarContent>
      <SidebarFooter></SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
