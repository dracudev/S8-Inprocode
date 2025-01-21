import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="flex flex-col w-full h-screen">
        <SidebarTrigger />
        <div className="flex items-center w-full h-full overflow-hidden">
          <Outlet />
        </div>
      </main>
    </SidebarProvider>
  );
};

export default Layout;
