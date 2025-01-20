import "./App.css";
import { Routes, Route } from "react-router-dom";
import Layout from "@/Layout";
import Home from "@/pages/Home";
import Chart from "@/pages/Chart";
import Calendar from "@/pages/Calendar";
import Map from "@/pages/Map";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/chart" element={<Chart />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/map" element={<Map />} />
      </Route>
    </Routes>
  );
};

export default App;
