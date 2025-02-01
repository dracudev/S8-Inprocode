import { ResponsiveBar } from "@nivo/bar";
import useFetchGame from "@/hooks/use-fetch-game";
import { Game } from "@/types/types";

const BarChart = () => {
  const { data, loading, error } = useFetchGame("api/games");

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

  type GenreCounts = {
    platform: string;
    Action: number;
    RPG: number;
    Adventure: number;
    Platformer: number;
    Multiplayer: number;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any; // Allow indexing with string keys
  };

  const platformGenreCounts = data.reduce((acc, game: Game) => {
    const { platform, genre } = game;
    platform.forEach((plat) => {
      if (!acc[plat]) {
        acc[plat] = {
          platform: plat,
          Action: 0,
          RPG: 0,
          Adventure: 0,
          Platformer: 0,
          Multiplayer: 0,
        };
      }
      genre.forEach((gen) => {
        if (acc[plat][gen] !== undefined) {
          acc[plat][gen] += 1;
        }
      });
    });
    return acc;
  }, {} as Record<string, GenreCounts>);

  const chartData = Object.values(platformGenreCounts);

  return (
    <ResponsiveBar
      data={chartData}
      keys={["Action", "RPG", "Adventure", "Platformer", "Multiplayer"]}
      indexBy="platform"
      margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
      padding={0.3}
      valueScale={{ type: "linear" }}
      indexScale={{ type: "band", round: true }}
      colors={{ scheme: "nivo" }}
      borderColor={{ from: "color", modifiers: [["darker", 1.6]] }}
      axisTop={null}
      axisRight={null}
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "Platform",
        legendPosition: "middle",
        legendOffset: 32,
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "Genres",
        legendPosition: "middle",
        legendOffset: -40,
      }}
      labelSkipWidth={12}
      labelSkipHeight={12}
      labelTextColor={{ from: "color", modifiers: [["darker", 1.6]] }}
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
          itemTextColor: "#ffffff",
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
      role="application"
      barAriaLabel={(e) =>
        `${e.id}: ${e.formattedValue} in platform: ${e.indexValue}`
      }
    />
  );
};

export default BarChart;
