import BarChart from "@/components/charts/BarChart";
import LineChart from "@/components/charts/LineChart";
import PieChart from "@/components/charts/PieChart";
import RadarChart from "@/components/charts/RadarChart";

const Chart = () => {
  return (
    <div className="h-full w-full grid grid-cols-2 grid-row-2 gap-2">
      <div className="h-full w-full">
        <PieChart></PieChart>
      </div>
      <div className="h-full w-full">
        <LineChart></LineChart>
      </div>
      <div className="h-full w-full">
        <BarChart></BarChart>
      </div>
      <div className="h-full w-full">
        <RadarChart></RadarChart>
      </div>
    </div>
  );
};

export default Chart;
