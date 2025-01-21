import { ResponsiveLine } from "@nivo/line";

const LineChart: React.FC = () => {
  const data = [
    {
      id: "japan",
      color: "hsl(285, 70%, 50%)",
      data: [
        {
          x: "plane",
          y: 71,
        },
        {
          x: "helicopter",
          y: 32,
        },
        {
          x: "boat",
          y: 263,
        },
        {
          x: "train",
          y: 244,
        },
        {
          x: "subway",
          y: 290,
        },
        {
          x: "bus",
          y: 166,
        },
        {
          x: "car",
          y: 14,
        },
        {
          x: "moto",
          y: 175,
        },
        {
          x: "bicycle",
          y: 288,
        },
        {
          x: "horse",
          y: 66,
        },
        {
          x: "skateboard",
          y: 93,
        },
        {
          x: "others",
          y: 132,
        },
      ],
    },
    {
      id: "france",
      color: "hsl(235, 70%, 50%)",
      data: [
        {
          x: "plane",
          y: 4,
        },
        {
          x: "helicopter",
          y: 75,
        },
        {
          x: "boat",
          y: 175,
        },
        {
          x: "train",
          y: 2,
        },
        {
          x: "subway",
          y: 38,
        },
        {
          x: "bus",
          y: 31,
        },
        {
          x: "car",
          y: 211,
        },
        {
          x: "moto",
          y: 225,
        },
        {
          x: "bicycle",
          y: 155,
        },
        {
          x: "horse",
          y: 230,
        },
        {
          x: "skateboard",
          y: 65,
        },
        {
          x: "others",
          y: 132,
        },
      ],
    },
    {
      id: "us",
      color: "hsl(244, 70%, 50%)",
      data: [
        {
          x: "plane",
          y: 37,
        },
        {
          x: "helicopter",
          y: 224,
        },
        {
          x: "boat",
          y: 92,
        },
        {
          x: "train",
          y: 72,
        },
        {
          x: "subway",
          y: 295,
        },
        {
          x: "bus",
          y: 159,
        },
        {
          x: "car",
          y: 6,
        },
        {
          x: "moto",
          y: 202,
        },
        {
          x: "bicycle",
          y: 6,
        },
        {
          x: "horse",
          y: 57,
        },
        {
          x: "skateboard",
          y: 145,
        },
        {
          x: "others",
          y: 137,
        },
      ],
    },
    {
      id: "germany",
      color: "hsl(347, 70%, 50%)",
      data: [
        {
          x: "plane",
          y: 174,
        },
        {
          x: "helicopter",
          y: 106,
        },
        {
          x: "boat",
          y: 180,
        },
        {
          x: "train",
          y: 238,
        },
        {
          x: "subway",
          y: 89,
        },
        {
          x: "bus",
          y: 76,
        },
        {
          x: "car",
          y: 186,
        },
        {
          x: "moto",
          y: 54,
        },
        {
          x: "bicycle",
          y: 206,
        },
        {
          x: "horse",
          y: 242,
        },
        {
          x: "skateboard",
          y: 17,
        },
        {
          x: "others",
          y: 89,
        },
      ],
    },
    {
      id: "norway",
      color: "hsl(104, 70%, 50%)",
      data: [
        {
          x: "plane",
          y: 36,
        },
        {
          x: "helicopter",
          y: 28,
        },
        {
          x: "boat",
          y: 279,
        },
        {
          x: "train",
          y: 261,
        },
        {
          x: "subway",
          y: 228,
        },
        {
          x: "bus",
          y: 278,
        },
        {
          x: "car",
          y: 198,
        },
        {
          x: "moto",
          y: 66,
        },
        {
          x: "bicycle",
          y: 219,
        },
        {
          x: "horse",
          y: 266,
        },
        {
          x: "skateboard",
          y: 81,
        },
        {
          x: "others",
          y: 65,
        },
      ],
    },
  ];
  return (
    <ResponsiveLine
      data={data}
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
        legend: "transportation",
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
    />
  );
};

export default LineChart;
