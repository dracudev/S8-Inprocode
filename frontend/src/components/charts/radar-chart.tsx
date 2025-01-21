import { ResponsiveRadar } from "@nivo/radar";

const RadarChart = () => {
  const data = [
    {
      taste: "fruity",
      chardonay: 55,
      carmenere: 111,
      syrah: 23,
    },
    {
      taste: "bitter",
      chardonay: 50,
      carmenere: 113,
      syrah: 40,
    },
    {
      taste: "heavy",
      chardonay: 120,
      carmenere: 62,
      syrah: 55,
    },
    {
      taste: "strong",
      chardonay: 29,
      carmenere: 29,
      syrah: 64,
    },
    {
      taste: "sunny",
      chardonay: 117,
      carmenere: 58,
      syrah: 103,
    },
  ];

  return (
    <ResponsiveRadar
      data={data}
      keys={["chardonay", "carmenere", "syrah"]}
      indexBy="taste"
      valueFormat=">-.2f"
      margin={{ top: 70, right: 80, bottom: 40, left: 80 }}
      borderColor={{ from: "color" }}
      gridLabelOffset={36}
      dotSize={10}
      dotColor={{ theme: "background" }}
      dotBorderWidth={2}
      colors={{ scheme: "nivo" }}
      blendMode="multiply"
      motionConfig="wobbly"
      legends={[
        {
          anchor: "top-left",
          direction: "column",
          translateX: -50,
          translateY: -40,
          itemWidth: 80,
          itemHeight: 20,
          itemTextColor: "#fff",
          symbolSize: 12,
          symbolShape: "circle",
          effects: [
            {
              on: "hover",
              style: {
                itemTextColor: "#fff",
              },
            },
          ],
        },
      ]}
    />
  );
};

export default RadarChart;
