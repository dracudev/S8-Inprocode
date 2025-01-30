import { Game } from "@/types/types";
import { useState, useEffect } from "react";
import defaultImage from "@/assets/default.jpg";

const useFetch = (endpoint: string, dependencies: unknown[] = []) => {
  const [data, setData] = useState<Game[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const baseUrl = import.meta.env.VITE_APP_CLIENT_HOST;
        // console.log(`Fetching from: ${baseUrl}${endpoint}`);
        const response = await fetch(`${baseUrl}${endpoint}`);
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
        const result = await response.json();
        // console.log("API Response:", result);
        const parsedData: Game[] = result.data.map((game: Game) => ({
          id_game: game.id_game,
          photo: game.photo ? encodeURI(game.photo) : defaultImage,
          title: game.title,
          platform:
            typeof game.platform === "string"
              ? game.platform.split(", ")
              : game.platform,
          genre:
            typeof game.genre === "string"
              ? game.genre.split(", ")
              : game.genre,
          year: game.year,
        }));
        // console.log("Parsed Data:", parsedData);
        setData(parsedData);
      } catch (err) {
        setError((err as Error).message);
        // console.error("Fetch Error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [endpoint, ...dependencies]);

  return { data, loading, error };
};

export default useFetch;
