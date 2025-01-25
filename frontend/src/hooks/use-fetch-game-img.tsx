import { useState, useEffect } from "react";

interface FetchState {
  backgroundImage: string | null;
  loading: boolean;
  error: string | null;
}

const useGameFetch = (gameName: string): FetchState => {
  const [backgroundImage, setBackgroundImage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const formattedGameName = gameName.toLowerCase().replace(/ /g, "-");
        const url = `https://api.rawg.io/api/games/${formattedGameName}?key=50b80750b0984512a5e830a9c443c3c8`;
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
        const result = await response.json();
        setBackgroundImage(result.background_image);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [gameName]);

  return { backgroundImage, loading, error };
};

export default useGameFetch;
