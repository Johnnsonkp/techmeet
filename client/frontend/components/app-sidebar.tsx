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

import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
import { NavUser } from "@/components/nav-user"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { TeamSwitcher } from "@/components/team-switcher"

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Acme Inc",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],
  navMain: [
    {
      title: "Home",
      url: "#",
      icon: Home,
      isActive: true,
    },
    {
      title: "My Events",
      url: "#",
      icon: Frame,
    },
    {
      title: "Calendar",
      url: "#",
      icon: Calendar,

    },
    {
      title: "Roadmap",
      url: "#",
      icon: Map,
    },
    {
      title: "Event Spaces",
      url: "#",
      icon: SectionIcon,
    },
    {
      title: "User Profile",
      url: "#",
      icon: User,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props} className="mt-24 border-t-2">
      <SidebarHeader>
        {/* <TeamSwitcher teams={data.teams} /> */}
        {/* <SidebarTrigger /> */}
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
