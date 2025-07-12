"use client"

import * as React from "react"

import {
  Calendar,
  Frame,
  Home,
  ListIcon,
  Map,
  SectionIcon,
  User,
  UserPlus2,
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
import { connectionIcon } from "./icons/ConnectionIcon"
import { usePathname } from 'next/navigation'

const data = {
  navMain: [
    { title: "Home", url: "/dashboard", icon: Home },
    { title: "My Events", url: "/dashboard/my_events", icon: ListIcon },
    { title: "Calendar", url: "/dashboard/calendar", icon: Calendar },
    { title: "Event Spaces", url: "/dashboard/event_spaces", icon: Frame },
    { title: "Roadmap", url: "/dashboard/roadmap", icon: Map },
    { title: "Connections", url: "/dashboard/connections", icon: UserPlus2 },
    { title: "User Profile", url: "/dashboard/user_profile", icon: User },
  ]
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const [active, setActive] = useState<string>('')
  const pathname = usePathname()

  useEffect(() => {
    if (pathname) {
      const segments = pathname.split('/').filter(Boolean)
      const newActive = segments[1] || segments[0] || ''
      if (newActive !== active) {
        setActive(newActive)
      }
    }
  }, [pathname, active])

  const processedItems = data.navMain.map((item) => {
    const segments = item.url.split('/').filter(Boolean)
    const pathSegment = segments[1] || segments[0]
    return {
      ...item,
      pathSegment,
      isActive: active === pathSegment,
    }
  })

  return (
    <Sidebar collapsible="icon" {...props} className="mt-15">
      <SidebarHeader />
      <SidebarContent>
        <NavMain items={processedItems} />
      </SidebarContent>
      <SidebarFooter />
      <SidebarRail />
    </Sidebar>
  )
}
