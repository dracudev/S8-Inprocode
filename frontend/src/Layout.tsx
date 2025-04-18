import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="flex flex-col w-full h-screen items-center">
        <div className="w-full flex justify-start">
          <SidebarTrigger />
        </div>

        <Outlet />
      </main>
    </SidebarProvider>
  );
};

export default Layout;
