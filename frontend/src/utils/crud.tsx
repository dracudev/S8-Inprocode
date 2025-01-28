export const handleCreate = (props: string) => {
  console.log("Create button clicked", props);
};

export const handleUpdate = (props: string) => {
  console.log("Update button clicked", props);
};

export const handleDelete = async (id: string, updateRowData: () => void) => {
  try {
    const baseUrl = import.meta.env.VITE_APP_CLIENT_HOST;
    const response = await fetch(`${baseUrl}/games/${id}`, {
      method: "DELETE",
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
