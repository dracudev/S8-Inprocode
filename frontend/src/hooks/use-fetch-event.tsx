import { useState, useEffect } from "react";
import { Event } from "@/types/types";

const useFetchEvent = (endpoint: string, dependencies: unknown[] = []) => {
  const [data, setData] = useState<Event[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const baseUrl = import.meta.env.VITE_APP_API_URL;
        const response = await fetch(`${baseUrl}${endpoint}`);
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
        const result = await response.json();
        const parsedData: Event[] = result.data.map(
          (event: Partial<Event>) => ({
            id_event: event.id_event,
            title: event.title,
            description: event.description,
            category: event.category,
            location: event.location,
            latitude: event.latitude,
            longitude: event.longitude,
            start_date: event.start_date,
            end_date: event.end_date,
            category_color: event.category_color,
          })
        );
        setData(parsedData);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [endpoint, ...dependencies]);

  return { data, loading, error };
};

export default useFetchEvent;
