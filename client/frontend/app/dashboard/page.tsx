import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import {LargeText, MediumText} from "@/components/ui/textDisplay/LargeText"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { currentUser, requireAuth } from '../../lib/auth/user'

import { AppSidebar } from "@/components/app-sidebar"
import { Separator } from "@/components/ui/separator"
import { SignOutButton } from "@/components/ui/authButtons/AuthButtons";

export default async function DashboardPage() {
  // await requireAuth()
  const user = await currentUser()

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="border-t-2 flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1 cursor-pointer" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#">
                    Dashboard
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Home</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-15 pt-0">
          <LargeText text={`Welcome, ${user?.name || ""}`}/>
          <div className="grid auto-rows-min gap-4 md:grid-cols-3">

          </div>
          <MediumText text={"Upcoming Events"}/>
          <div className="grid auto-rows-min gap-4 md:grid-cols-3">
            <div className="bg-muted/50 aspect-video rounded-xl" />
            <div className="bg-muted/50 aspect-video rounded-xl" />
            <div className="bg-muted/50 aspect-video rounded-xl" />
          </div>
          <MediumText text={"Recommended Events"}/>
          <div className="grid auto-rows-min gap-4 md:grid-cols-3">
            <div className="bg-muted/50 aspect-video rounded-xl" />
            <div className="bg-muted/50 aspect-video rounded-xl" />
            <div className="bg-muted/50 aspect-video rounded-xl" />
          </div>
          <div className="bg-muted/50 min-h-[100vh] flex-1 rounded-xl md:min-h-min" />
        </div>
      </SidebarInset>
     
    </SidebarProvider>
  )
}


// import { currentUser, requireAuth } from '../../lib/auth/user'

// import { SignOutButton } from "@/components/ui/authButtons/AuthButtons";

// const DashboardPage = async ()  => {
//   await requireAuth()
//   const user = await currentUser()

//   return (
//     <div className="border-2 p-5 pt-20">
//       <div className="flex justify-between">
//         <h1>Dashboard</h1>
//         <SignOutButton />
//       </div>
      
//       <p>Welcome, {user?.name}</p>
//       <p>Email: {user?.email}</p>
//       <p>Avatar: {user?.image}</p> 
//     </div>
//   )
// }

// export default DashboardPage