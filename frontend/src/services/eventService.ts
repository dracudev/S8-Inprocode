import { type Event } from "@/types/types";

const defaultHeaders = {
  "Content-Type": "application/json",
};

export const handleCreate = async (
  formData: Partial<Event>,
  updateRowData: () => void
): Promise<void> => {
  try {
    const baseUrl = import.meta.env.VITE_APP_API_URL;

    const payload = {
      title: formData.title,
      start_date: formData.start_date,
      end_date: formData.end_date,
      description: formData.description,
    };

    // console.log("Sending payload:", payload);

    const response = await fetch(`${baseUrl}api/event`, {
      method: "POST",
      headers: defaultHeaders,
      credentials: "include",
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const text = await response.text();
      try {
        const data = JSON.parse(text);
        throw new Error(data.message || "Error creating Event");
      } catch {
        throw new Error(`Server error: ${text}`);
      }
    }

    const data = await response.json();
    console.log("Event created successfully:", data);
    updateRowData();
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error creating Event", error.message);
    } else {
      console.error("Unexpected error", error);
    }
    throw error;
  }
};

export const handleUpdate = async (
  formData: Partial<Event>,
  updateRowData: () => void
): Promise<void> => {
  try {
    const baseUrl = import.meta.env.VITE_APP_API_URL;

    if (!formData.id_event) {
      throw new Error("Event ID is required for update");
    }

    const payload = {
      title: formData.title,
      start_date: formData.start_date,
      end_date: formData.end_date,
      description: formData.description,
    };

    // console.log("Updating Event with payload:", payload);

    const response = await fetch(`${baseUrl}api/event/${formData.id_event}`, {
      method: "PATCH",
      headers: defaultHeaders,
      credentials: "include",
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const text = await response.text();
      try {
        const data = JSON.parse(text);
        throw new Error(data.message || "Error updating Event");
      } catch {
        throw new Error(`Server error: ${text}`);
      }
    }

    console.log("Event updated successfully");
    updateRowData();
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error updating Event:", error.message);
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
    const response = await fetch(`${baseUrl}api/event/${id}`, {
      method: "DELETE",
      headers: defaultHeaders,
      credentials: "include",
    });
    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.message || "Error deleting Event");
    }
    console.log("Event deleted successfully");
    updateRowData();
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error deleting Event", error.message);
    } else {
      console.error("Unexpected error", error);
    }
  }
};
