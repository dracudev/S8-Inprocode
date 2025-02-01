import { ResponsivePie } from "@nivo/pie";
import useFetch from "@/hooks/use-fetch-game";
import { Game } from "@/types/types";

const PieChart: React.FC = () => {
  const { data, loading, error } = useFetch("api/games");

  const parsedData = Object.values(
    data.reduce((acc, game: Game) => {
      game.platform.forEach((platform) => {
        if (!acc[platform]) {
          acc[platform] = {
            id: platform,
            label: platform,
            value: 0,
            color: "hsl(0, 70%, 50%)",
          };
        }
        acc[platform].value += 1;
      });
      return acc;
    }, {} as Record<string, { id: string; label: string; value: number; color: string }>)
  );

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
    <ResponsivePie
      data={parsedData}
      margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
      innerRadius={0.5}
      padAngle={0.7}
      cornerRadius={3}
      activeOuterRadiusOffset={8}
      borderWidth={1}
      borderColor={{
        from: "color",
        modifiers: [["darker", 0.2]],
      }}
      arcLinkLabelsSkipAngle={10}
      arcLinkLabelsTextColor="#fff"
      arcLinkLabelsThickness={2}
      arcLinkLabelsColor={{ from: "color" }}
      arcLabelsSkipAngle={10}
      arcLabelsTextColor={{
        from: "color",
        modifiers: [["darker", 2]],
      }}
      tooltip={({ datum }) => (
        <div
          style={{
            color: "black",
            background: "white",
            padding: "5px",
            borderRadius: "3px",
          }}
        >
          <strong>{datum.id}</strong>: {datum.value}
        </div>
      )}
      defs={[
        {
          id: "dots",
          type: "patternDots",
          background: "inherit",
          color: "rgba(255, 255, 255, 0.3)",
          size: 4,
          padding: 1,
          stagger: true,
        },
        {
          id: "lines",
          type: "patternLines",
          background: "inherit",
          color: "rgba(255, 255, 255, 0.3)",
          rotation: -45,
          lineWidth: 6,
          spacing: 10,
        },
      ]}
      fill={[
        {
          match: {
            id: "Mobile",
          },
          id: "dots",
        },
        {
          match: {
            id: "PC",
          },
          id: "lines",
        },
        {
          match: {
            id: "Xbox",
          },
          id: "dots",
        },
        {
          match: {
            id: "Nintendo",
          },
          id: "lines",
        },
        {
          match: {
            id: "PlayStation",
          },
          id: "dots",
        },
      ]}
      legends={[
        {
          anchor: "bottom",
          direction: "row",
          justify: false,
          translateX: 30,
          translateY: 56,
          itemsSpacing: -35,
          itemWidth: 100,
          itemHeight: 18,
          itemTextColor: "#fff",
          itemDirection: "left-to-right",
          itemOpacity: 1,
          symbolSize: 18,
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

export default PieChart;
