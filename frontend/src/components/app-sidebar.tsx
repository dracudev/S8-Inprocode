import {
  Calendar,
  Home,
  LucideSquareGanttChart,
  LucideMapPinned,
  User2,
  ChevronUp,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Link } from "react-router-dom";

const items = [
  {
    title: "Home",
    url: "/",
    icon: Home,
  },
  {
    title: "Chart",
    url: "/chart",
    icon: LucideSquareGanttChart,
  },
  {
    title: "Calendar",
    url: "calendar",
    icon: Calendar,
  },
  {
    title: "Map",
    url: "map",
    icon: LucideMapPinned,
  },
];
export function AppSidebar() {
  return (
    <Sidebar collapsible="icon" variant="sidebar">
      <SidebarContent className="bg-zinc-900 text-white">
        <SidebarGroup>
          <SidebarGroupLabel className="text-white text-md ">
            Inprocode
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild className="text-white">
                    <Link to={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className=" bg-zinc-900 text-white">
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton>
                  <User2 /> Username
                  <ChevronUp className="ml-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="top"
                className="w-[--radix-popper-anchor-width]"
              >
                <Link to={"#"}>
                  <DropdownMenuItem
                    disabled
                    className="focus:bg-zinc-800 focus:text-slate-50 "
                  >
                    <span>Account</span>
                  </DropdownMenuItem>
                </Link>
                <Link to={"/games"}>
                  <DropdownMenuItem className="focus:bg-zinc-800 focus:text-slate-50 cursor-pointer">
                    <span>Games</span>
                  </DropdownMenuItem>
                </Link>
                <DropdownMenuItem
                  disabled
                  className="focus:bg-zinc-800 focus:text-slate-50 "
                >
                  <span>Sign out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
