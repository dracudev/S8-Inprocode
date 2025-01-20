import "./App.css";
import { Routes, Route } from "react-router-dom";
import Layout from "@/Layout";
import Home from "@/pages/Home";
import Chart from "@/pages/Chart";
import Calendar from "@/pages/Calendar";
import Map from "@/pages/Map";
import Profile from "@/pages/Profile";
import Games from "@/pages/Games";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/chart" element={<Chart />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/map" element={<Map />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/games" element={<Games />} />
      </Route>
    </Routes>
  );
};

export default App;
