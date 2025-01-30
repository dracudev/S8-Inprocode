import { ResponsiveBar } from "@nivo/bar";
// import useFetch from "@/hooks/use-fetch";

const BarChart = () => {
  const data = [
    {
      country: "AD",
      "hot dog": 61,
      "hot dogColor": "hsl(74, 70%, 50%)",
      burger: 62,
      burgerColor: "hsl(318, 70%, 50%)",
      sandwich: 173,
      sandwichColor: "hsl(144, 70%, 50%)",
      kebab: 24,
      kebabColor: "hsl(155, 70%, 50%)",
      fries: 8,
      friesColor: "hsl(330, 70%, 50%)",
      donut: 94,
      donutColor: "hsl(325, 70%, 50%)",
    },
    {
      country: "AE",
      "hot dog": 130,
      "hot dogColor": "hsl(267, 70%, 50%)",
      burger: 49,
      burgerColor: "hsl(165, 70%, 50%)",
      sandwich: 106,
      sandwichColor: "hsl(108, 70%, 50%)",
      kebab: 40,
      kebabColor: "hsl(184, 70%, 50%)",
      fries: 24,
      friesColor: "hsl(191, 70%, 50%)",
      donut: 123,
      donutColor: "hsl(148, 70%, 50%)",
    },
    {
      country: "AF",
      "hot dog": 159,
      "hot dogColor": "hsl(105, 70%, 50%)",
      burger: 124,
      burgerColor: "hsl(240, 70%, 50%)",
      sandwich: 184,
      sandwichColor: "hsl(226, 70%, 50%)",
      kebab: 76,
      kebabColor: "hsl(43, 70%, 50%)",
      fries: 175,
      friesColor: "hsl(146, 70%, 50%)",
      donut: 39,
      donutColor: "hsl(52, 70%, 50%)",
    },
    {
      country: "AG",
      "hot dog": 188,
      "hot dogColor": "hsl(169, 70%, 50%)",
      burger: 61,
      burgerColor: "hsl(251, 70%, 50%)",
      sandwich: 103,
      sandwichColor: "hsl(348, 70%, 50%)",
      kebab: 99,
      kebabColor: "hsl(153, 70%, 50%)",
      fries: 124,
      friesColor: "hsl(205, 70%, 50%)",
      donut: 95,
      donutColor: "hsl(8, 70%, 50%)",
    },
    {
      country: "AI",
      "hot dog": 188,
      "hot dogColor": "hsl(161, 70%, 50%)",
      burger: 158,
      burgerColor: "hsl(245, 70%, 50%)",
      sandwich: 152,
      sandwichColor: "hsl(254, 70%, 50%)",
      kebab: 64,
      kebabColor: "hsl(94, 70%, 50%)",
      fries: 13,
      friesColor: "hsl(171, 70%, 50%)",
      donut: 117,
      donutColor: "hsl(56, 70%, 50%)",
    },
    {
      country: "AL",
      "hot dog": 64,
      "hot dogColor": "hsl(74, 70%, 50%)",
      burger: 84,
      burgerColor: "hsl(312, 70%, 50%)",
      sandwich: 135,
      sandwichColor: "hsl(179, 70%, 50%)",
      kebab: 123,
      kebabColor: "hsl(96, 70%, 50%)",
      fries: 180,
      friesColor: "hsl(82, 70%, 50%)",
      donut: 34,
      donutColor: "hsl(239, 70%, 50%)",
    },
    {
      country: "AM",
      "hot dog": 159,
      "hot dogColor": "hsl(43, 70%, 50%)",
      burger: 152,
      burgerColor: "hsl(252, 70%, 50%)",
      sandwich: 19,
      sandwichColor: "hsl(230, 70%, 50%)",
      kebab: 78,
      kebabColor: "hsl(250, 70%, 50%)",
      fries: 97,
      friesColor: "hsl(149, 70%, 50%)",
      donut: 194,
      donutColor: "hsl(25, 70%, 50%)",
    },
  ];

  return (
    <ResponsiveBar
      data={data}
      keys={["hot dog", "burger", "sandwich", "kebab", "fries", "donut"]}
      indexBy="country"
      margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
      padding={0.3}
      valueScale={{ type: "linear" }}
      indexScale={{ type: "band", round: true }}
      colors={{ scheme: "nivo" }}
      defs={[
        {
          id: "dots",
          type: "patternDots",
          background: "inherit",
          color: "#38bcb2",
          size: 4,
          padding: 1,
          stagger: true,
        },
        {
          id: "lines",
          type: "patternLines",
          background: "inherit",
          color: "#eed312",
          rotation: -45,
          lineWidth: 6,
          spacing: 10,
        },
      ]}
      fill={[
        {
          match: {
            id: "fries",
          },
          id: "dots",
        },
        {
          match: {
            id: "sandwich",
          },
          id: "lines",
        },
      ]}
      borderColor={{
        from: "color",
        modifiers: [["darker", 1.6]],
      }}
      axisTop={null}
      axisRight={null}
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "country",
        legendPosition: "middle",
        legendOffset: 32,
        truncateTickAt: 0,
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "food",
        legendPosition: "middle",
        legendOffset: -40,
        truncateTickAt: 0,
      }}
      labelSkipWidth={12}
      labelSkipHeight={12}
      labelTextColor={{
        from: "color",
        modifiers: [["darker", 1.6]],
      }}
      legends={[
        {
          dataFrom: "keys",
          anchor: "bottom-right",
          direction: "column",
          justify: false,
          translateX: 120,
          translateY: 0,
          itemsSpacing: 2,
          itemWidth: 100,
          itemHeight: 20,
          itemDirection: "left-to-right",
          itemOpacity: 0.85,
          symbolSize: 20,
          effects: [
            {
              on: "hover",
              style: {
                itemOpacity: 1,
              },
            },
          ],
        },
      ]}
      role="application"
      ariaLabel="Nivo bar chart demo"
      barAriaLabel={(e) =>
        e.id + ": " + e.formattedValue + " in country: " + e.indexValue
      }
    />
  );
};

export default BarChart;
