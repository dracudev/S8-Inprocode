import useFetchUsers from "@/hooks/use-fetch-user";
import { ResponsiveLine } from "@nivo/line";

const LineChart: React.FC = () => {
  const { data, loading, error } = useFetchUsers("/user");
  data.forEach((user) => {
    const date = new Date(user.created_at);
    console.log(
      `created_at: ${user.created_at}, parsed month: ${date.getMonth()}`
    );
  });
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const monthlyUserCounts = data.reduce((acc, user) => {
    const month = new Date(user.created_at).getMonth();
    acc[month] = (acc[month] || 0) + 1;
    return acc;
  }, Array(12).fill(0));

  const chartData = [
    {
      id: "users",
      color: "hsl(285, 70%, 50%)",
      data: monthNames.map((month, index) => ({
        x: month,
        y: monthlyUserCounts[index],
      })),
    },
  ];

  if (loading)
    return (
      <div className="w-full h-full flex items-center justify-center">
        Loading...
      </div>
    );
  if (error)
    return (
      <div className="w-full h-full flex items-center justify-center text-red-500">
        Error: {error}
      </div>
    );

  return (
    <ResponsiveLine
      data={chartData}
      margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
      xScale={{ type: "point" }}
      yScale={{
        type: "linear",
        min: "auto",
        max: "auto",
        stacked: true,
        reverse: false,
      }}
      yFormat=" >-.2f"
      axisTop={null}
      axisRight={null}
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "month",
        legendOffset: 36,
        legendPosition: "middle",
        truncateTickAt: 0,
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "count",
        legendOffset: -40,
        legendPosition: "middle",
        truncateTickAt: 0,
      }}
      pointSize={10}
      pointColor={{ theme: "background" }}
      pointBorderWidth={2}
      pointBorderColor={{ from: "serieColor" }}
      pointLabel="data.yFormatted"
      pointLabelYOffset={-12}
      enableTouchCrosshair={true}
      useMesh={true}
      legends={[
        {
          anchor: "bottom-right",
          direction: "column",
          itemTextColor: "#fff",
          justify: false,
          translateX: 100,
          translateY: 0,
          itemsSpacing: 0,
          itemDirection: "left-to-right",
          itemWidth: 80,
          itemHeight: 20,
          itemOpacity: 0.75,
          symbolSize: 12,
          symbolShape: "circle",
          symbolBorderColor: "rgba(0, 0, 0, .5)",
          effects: [
            {
              on: "hover",
              style: {
                itemBackground: "rgba(0, 0, 0, .03)",
                itemOpacity: 1,
              },
            },
          ],
        },
      ]}
      theme={{
        axis: {
          ticks: {
            text: {
              fill: "#ffffff",
            },
          },
          legend: {
            text: {
              fill: "#ffffff",
            },
          },
        },
        tooltip: {
          container: {
            color: "#000000",
          },
        },
      }}
    />
  );
};

export default LineChart;
