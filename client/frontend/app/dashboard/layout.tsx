import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { currentUser, requireAuth } from '../../lib/auth/user'

import { AppSidebar } from "@/components/app-sidebar"
import PathDisplay from "@/components/ui/ServerCompBreadCrumb"
import { Separator } from "@/components/ui/separator"
import { SignOutButton } from "@/components/ui/authButtons/AuthButtons";

export default async function DashboardPage({children}: {children: React.ReactNode}) {
  await requireAuth()
  // const user = await currentUser()
  // const {smoothTransition}: any = useTransitionCustom();

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
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
                  <BreadcrumbPage><PathDisplay /></BreadcrumbPage>
                </BreadcrumbItem>
                <SignOutButton />
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <main className="">{children}</main>
      </SidebarInset>
     
    </SidebarProvider>
  )
}