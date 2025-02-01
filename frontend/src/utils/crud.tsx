import { type Game } from "@/types/types";

const defaultHeaders = {
  "Content-Type": "application/json",
};

export const handleCreate = async (
  formData: Game,
  updateRowData: () => void
): Promise<void> => {
  try {
    const baseUrl = import.meta.env.VITE_APP_API_URL;

    // Format the data to match backend expectations
    const payload = {
      title: formData.title,
      platform: formData.platform, // Backend will handle the array-to-string conversion
      genre: formData.genre, // Backend will handle the array-to-string conversion
      year: formData.year,
      photo: formData.photo,
    };

    console.log("Sending payload:", payload); // Debug log

    const response = await fetch(`${baseUrl}api/games`, {
      method: "POST",
      headers: defaultHeaders,
      credentials: "include",
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const text = await response.text();
      try {
        const data = JSON.parse(text);
        throw new Error(data.message || "Error creating game");
      } catch {
        throw new Error(`Server error: ${text}`);
      }
    }

    const data = await response.json();
    console.log("Game created successfully:", data);
    updateRowData();
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error creating game", error.message);
    } else {
      console.error("Unexpected error", error);
    }
    throw error;
  }
};

export const handleUpdate = async (
  formData: Game,
  updateRowData: () => void
): Promise<void> => {
  try {
    const baseUrl = import.meta.env.VITE_APP_API_URL;

    if (!formData.id_game) {
      throw new Error("Game ID is required for update");
    }

    // Format the data to match backend expectations
    const payload = {
      title: formData.title,
      platform: formData.platform,
      genre: formData.genre,
      year: formData.year,
      photo: formData.photo,
    };

    console.log("Updating game with payload:", payload); // Debug log

    const response = await fetch(`${baseUrl}api/games/${formData.id_game}`, {
      method: "PATCH",
      headers: defaultHeaders,
      credentials: "include",
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const text = await response.text();
      try {
        const data = JSON.parse(text);
        throw new Error(data.message || "Error updating game");
      } catch {
        throw new Error(`Server error: ${text}`);
      }
    }

    console.log("Game updated successfully");
    updateRowData();
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error updating game:", error.message);
    } else {
      console.error("Unexpected error:", error);
    }
    throw error;
  }
};

export const handleDelete = async (
  id: string,
  updateRowData: () => void
): Promise<void> => {
  try {
    const baseUrl = import.meta.env.VITE_APP_API_URL;
    const response = await fetch(`${baseUrl}api/games/${id}`, {
      method: "DELETE",
      headers: defaultHeaders,
      credentials: "include",
    });
    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.message || "Error deleting game");
    }
    console.log("Game deleted successfully");
    updateRowData();
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error deleting game", error.message);
    } else {
      console.error("Unexpected error", error);
    }
  }
};
