import BarChart from "@/components/charts/bar-chart";
import LineChart from "@/components/charts/line-chart";
import PieChart from "@/components/charts/pie-chart";
import RadarChart from "@/components/charts/radar-chart";

const Chart = () => {
  return (
    <div className="h-full w-full grid  md:grid-cols-2 md:grid-row-2 gap-2 overflow-auto">
      <div className="md:h-full md:w-full h-[50vh] w-full">
        <PieChart></PieChart>
      </div>
      <div className="md:h-full md:w-full h-[50vh] w-full">
        <RadarChart></RadarChart>
      </div>
      <div className="md:h-full md:w-full h-[50vh] w-full">
        <LineChart></LineChart>
      </div>
      <div className="md:h-full md:w-full h-[50vh] w-full">
        <BarChart></BarChart>
      </div>
    </div>
  );
};

export default Chart;
