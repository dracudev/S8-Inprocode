import BarChart from "@/components/charts/bar-chart";
import LineChart from "@/components/charts/line-chart";
import PieChart from "@/components/charts/pie-chart";
import RadarChart from "@/components/charts/radar-chart";

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
