import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { Button } from "../ui/button";
import { Game } from "@/types/types";
import { X } from "lucide-react";

const ALLOWED_PLATFORMS = ["PC", "PlayStation", "Xbox", "Nintendo", "Mobile"];
const ALLOWED_GENRES = [
  "Action",
  "Adventure",
  "RPG",
  "Strategy",
  "Simulation",
  "Sports",
  "Puzzle",
  "Idle",
  "FPS",
  "VR",
  "Roguelike",
  "Sci-Fi",
  "Racing",
  "Open World",
  "TPS",
  "Platformer",
  "Multiplayer",
  "Social",
  "Shooter",
  "Battle Royale",
  "Party",
  "Augmented Reality",
];

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (formData: Game) => void;
  initialData?: Game;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  initialData,
}) => {
  const defaultFormData: Game = {
    id_game: 0,
    title: "",
    platform: [],
    genre: [],
    photo: null,
    year: new Date().getFullYear(),
  };

  const [formData, setFormData] = useState<Game>(defaultFormData);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      setFormData(defaultFormData);
    }
    setErrors({});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialData, isOpen]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    if (name === "platform" || name === "genre") {
      const selectedOptions = Array.from(
        (e.target as HTMLSelectElement).selectedOptions,
        (option) => option.value
      );
      setFormData((prev) => ({
        ...prev,
        [name]: selectedOptions,
      }));
    } else if (name === "year") {
      setFormData((prev) => ({
        ...prev,
        [name]: parseInt(value) || new Date().getFullYear(),
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({});

    const newErrors: Record<string, string> = {};
    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
    }
    if (formData.platform.length === 0) {
      newErrors.platform = "At least one platform is required";
    }
    if (formData.genre.length === 0) {
      newErrors.genre = "At least one genre is required";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // console.log("Submitting form data:", formData);
    onSubmit(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-lg shadow-xl w-full max-w-md p-6 relative">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
        >
          <X size={20} />
        </button>

        <h2 className="text-2xl font-bold mb-6">
          {initialData ? "Update Game" : "Create Game"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-md ${
                errors.title ? "border-red-500" : ""
              }`}
              required
            />
            {errors.title && (
              <p className="text-red-500 text-sm">{errors.title}</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium">
              Platform (select multiple)
            </label>
            <select
              multiple
              name="platform"
              value={formData.platform}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-md ${
                errors.platform ? "border-red-500" : ""
              }`}
              required
            >
              {ALLOWED_PLATFORMS.map((platform) => (
                <option key={platform} value={platform}>
                  {platform}
                </option>
              ))}
            </select>
            {errors.platform && (
              <p className="text-red-500 text-sm">{errors.platform}</p>
            )}
            <p className="text-sm text-gray-500">
              Hold Ctrl/Cmd to select multiple
            </p>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium">
              Genre (select multiple)
            </label>
            <select
              multiple
              name="genre"
              value={formData.genre}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-md ${
                errors.genre ? "border-red-500" : ""
              }`}
              required
            >
              {ALLOWED_GENRES.map((genre) => (
                <option key={genre} value={genre}>
                  {genre}
                </option>
              ))}
            </select>
            {errors.genre && (
              <p className="text-red-500 text-sm">{errors.genre}</p>
            )}
            <p className="text-sm text-gray-500">
              Hold Ctrl/Cmd to select multiple
            </p>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium">Year</label>
            <input
              type="number"
              name="year"
              value={formData.year}
              onChange={handleChange}
              min="1950"
              max={new Date().getFullYear() + 1}
              className="w-full px-3 py-2 border rounded-md"
              required
            />
          </div>

          <div className="flex justify-end space-x-3 mt-6">
            <Button type="button" variant="destructive" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" variant="default">
              {initialData ? "Update" : "Create"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;
