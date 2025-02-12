import { useState } from "react";

const ALLOWED_CATEGORIES = [
  "Meeting",
  "Conference",
  "Game Jam",
  "Competition",
] as const;
type CategoryType = (typeof ALLOWED_CATEGORIES)[number];

interface LegendProps {
  onFilterChange: (selectedCategories: CategoryType[]) => void;
}

const MapLegend: React.FC<LegendProps> = ({ onFilterChange }) => {
  const [selectedCategories, setSelectedCategories] = useState<
    Set<CategoryType>
  >(new Set(ALLOWED_CATEGORIES));

  const handleCheckboxChange = (category: CategoryType) => {
    const newSelectedCategories = new Set(selectedCategories);
    if (newSelectedCategories.has(category)) {
      newSelectedCategories.delete(category);
    } else {
      newSelectedCategories.add(category);
    }
    setSelectedCategories(newSelectedCategories);
    onFilterChange(Array.from(newSelectedCategories));
  };

  return (
    <div className="absolute top-12 right-5 bg-zinc-900 p-4 rounded-lg shadow-lg z-10">
      <h3 className="text-white font-semibold mb-3">Event Categories</h3>
      <div className="space-y-2">
        {ALLOWED_CATEGORIES.map((category) => (
          <label
            key={category}
            className="flex items-center space-x-2 text-white cursor-pointer"
          >
            <input
              type="checkbox"
              checked={selectedCategories.has(category)}
              onChange={() => handleCheckboxChange(category)}
              className=" h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
            />
            <span>{category}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default MapLegend;
