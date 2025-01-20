import "./App.css";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <Routes>
      <SidebarProvider>
        <AppSidebar />
        <main>
          <SidebarTrigger />
          <Route>{/* Routes/pages go here */}</Route>
        </main>
      </SidebarProvider>
    </Routes>
  );
};

export default App;
