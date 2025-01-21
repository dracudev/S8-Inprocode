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
          <div className="bg-zinc-900 shadow-xl w-full h-[97%] m-5 rounded-md flex ">
            <Outlet />
          </div>
        </div>
      </main>
    </SidebarProvider>
  );
};

export default Layout;
