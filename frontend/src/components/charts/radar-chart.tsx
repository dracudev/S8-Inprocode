import useFetch from "@/hooks/use-fetch-game";
import { Game } from "@/types/types";
import { ResponsiveRadar } from "@nivo/radar";

const RadarChart = () => {
  const { data, loading, error } = useFetch("api/game");
  const parsedData = Array.isArray(data)
    ? Object.values(
        data.reduce((acc, game: Game) => {
          game.platform.forEach((platform) => {
            if (!acc[platform]) {
              acc[platform] = {
                platform,
                Action: 0,
                RPG: 0,
                Adventure: 0,
              };
            }
            if (game.genre.includes("Action")) {
              acc[platform].Action += 1;
            }
            if (game.genre.includes("RPG")) {
              acc[platform].RPG += 1;
            }
            if (game.genre.includes("Adventure")) {
              acc[platform].Adventure += 1;
            }
          });
          return acc;
        }, {} as Record<string, { platform: string; Action: number; RPG: number; Adventure: number }>)
      )
    : [];

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
    <ResponsiveRadar
      data={parsedData}
      keys={["Action", "RPG", "Adventure"]}
      indexBy="platform"
      valueFormat=">-.2f"
      margin={{ top: 70, right: 80, bottom: 40, left: 80 }}
      borderColor={{ from: "color" }}
      gridLabelOffset={36}
      dotSize={10}
      dotColor={{ theme: "background" }}
      dotBorderWidth={2}
      colors={{ scheme: "tableau10" }}
      blendMode="screen"
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
      theme={{
        axis: {
          ticks: {
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

export default RadarChart;
