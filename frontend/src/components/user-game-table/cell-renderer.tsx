import React from "react";
import { Button } from "../ui/button";
import { handleDelete } from "@/services/gameService";
import { Game } from "@/types/types";
import { ICellRendererParams } from "ag-grid-community";

interface GamePhotoRendererProps extends ICellRendererParams {
  value: string;
}

export const GamePhotoRenderer: React.FC<GamePhotoRendererProps> = (props) => {
  return (
    <div className="w-full h-full">
      <img
        src={props.value}
        alt="Game Photo"
        className="h-full w-auto object-cover"
      />
    </div>
  );
};

interface OptionsCellRendererProps extends ICellRendererParams {
  data: Game;
  updateRowData: () => void;
  onEdit: (data: Game) => void;
}

export const OptionsCellRenderer: React.FC<OptionsCellRendererProps> = ({
  data,
  updateRowData,
  onEdit,
}) => {
  return (
    <div className="flex justify-around items-center w-full h-full px-2">
      <Button
        variant="secondary"
        className="px-4 py-2 text-sm"
        onClick={() => onEdit(data)}
      >
        Edit
      </Button>
      <Button
        variant="destructive"
        className="px-4 py-2 text-sm"
        onClick={() => handleDelete(data.id_game.toString(), updateRowData)}
      >
        Delete
      </Button>
    </div>
  );
};

interface CreateButtonHeaderProps {
  onOpenModal: () => void;
}

export const CreateButtonHeader: React.FC<CreateButtonHeaderProps> = ({
  onOpenModal,
}) => {
  return (
    <div className="flex justify-between items-center px-2">
      <span className="mr-2">Options</span>
      <Button
        variant="default"
        size="sm"
        className="w-6 h-6 p-0 flex items-center justify-center"
        onClick={onOpenModal}
      >
        <span className="transform -translate-y-0.5 ">+</span>
      </Button>
    </div>
  );
};
