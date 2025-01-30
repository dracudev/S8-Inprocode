import { User } from "@/types/types";
import { useState, useEffect } from "react";
import defaultImage from "@/assets/default.jpg";

const useFetchUsers = (endpoint: string, dependencies: unknown[] = []) => {
  const [data, setData] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const baseUrl = import.meta.env.VITE_APP_CLIENT_HOST;
        const response = await fetch(`${baseUrl}${endpoint}`);
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
        const result = await response.json();
        const parsedData: User[] = result.data.map((user: Partial<User>) => ({
          username: user.username,
          email: user.email,
          password: user.password,
          photo: user.photo ? encodeURI(user.photo) : defaultImage,
          created_at: user.created_at,
        }));
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

export default useFetchUsers;
