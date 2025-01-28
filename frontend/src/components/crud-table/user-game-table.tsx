import { useCallback, useMemo, useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import {
  ModuleRegistry,
  AllCommunityModule,
  themeQuartz,
} from "ag-grid-community";
import { Game } from "@/types/types";
import defaultImage from "@/assets/default.jpg";
import {
  GamePhotoRenderer,
  OptionsCellRenderer,
  CreateButtonHeader,
} from "./cell-renderer";
import Modal from "./modal";
import { handleCreate, handleUpdate } from "@/utils/crud";

ModuleRegistry.registerModules([AllCommunityModule]);

const myTheme = themeQuartz.withParams({
  accentColor: "#AF22F2",
  backgroundColor: "#1f2836",
  browserColorScheme: "dark",
  chromeBackgroundColor: {
    ref: "foregroundColor",
    mix: 0.07,
    onto: "backgroundColor",
  },
  foregroundColor: "#FFFFFF",
  headerFontSize: 14,
  borderRadius: "0px",
  inputBorderRadius: "0px",
  wrapperBorderRadius: "0px",
});

const UserGameTable: React.FC = () => {
  const [refresh, setRefresh] = useState(false);
  const [rowData, setRowData] = useState<Game[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState<Game | undefined>(undefined);

  useEffect(() => {
    const fetchData = async () => {
      const baseUrl = import.meta.env.VITE_APP_CLIENT_HOST;
      const response = await fetch(`${baseUrl}/games`);
      const result = await response.json();
      const parsedData: Game[] = result.data.map((game: Game) => ({
        id_game: game.id_game,
        photo: game.photo ? encodeURI(game.photo) : defaultImage,
        title: game.title,
        platform:
          typeof game.platform === "string"
            ? game.platform.split(", ")
            : game.platform,
        genre:
          typeof game.genre === "string" ? game.genre.split(", ") : game.genre,
        year: game.year,
      }));
      setRowData(parsedData);
    };
    fetchData();
  }, [refresh]);

  const updateRowData = () => {
    setRefresh((prev) => !prev);
  };

  const handleOpenModal = (data?: Game) => {
    if (data) {
      const modalFormData: Game = {
        id_game: data.id_game,
        title: data.title,
        photo: data.photo,
        year: data.year,
        platform:
          typeof data.platform === "string"
            ? data.platform.split(", ")
            : data.platform,
        genre:
          typeof data.genre === "string" ? data.genre.split(", ") : data.genre,
      };
      setModalData(modalFormData);
    } else {
      setModalData(undefined);
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setModalData(undefined);
  };

  const handleSubmitModal = async (formData: Game) => {
    try {
      if (modalData) {
        await handleUpdate(
          {
            ...formData,
            id_game: modalData.id_game,
          },
          updateRowData
        );
      } else {
        await handleCreate(formData, updateRowData);
      }
      handleCloseModal();
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const containerStyle = useMemo(() => ({ width: "100%", height: "100%" }), []);
  const gridStyle = useMemo(() => ({ height: "100%", width: "100%" }), []);
  const defaultColDef = useMemo(() => ({ flex: 1 }), []);
  const [columnDefs] = useState([
    { headerName: "Photo", field: "photo", cellRenderer: GamePhotoRenderer },
    { headerName: "Title", field: "title" },
    { headerName: "Platform", field: "platform" },
    { headerName: "Genre", field: "genre" },
    {
      headerName: "Options",
      field: "options",
      cellRenderer: (params) => (
        <OptionsCellRenderer
          {...params}
          updateRowData={updateRowData}
          onEdit={handleOpenModal}
        />
      ),
      headerComponent: () => (
        <CreateButtonHeader onOpenModal={() => handleOpenModal()} />
      ),
      flex: 1,
    },
  ]);

  const onGridReady = useCallback(
    (params) => {
      params.api.setRowData(rowData);
    },
    [rowData]
  );

  return (
    <div style={containerStyle}>
      <div style={gridStyle}>
        <AgGridReact
          defaultColDef={defaultColDef}
          columnDefs={columnDefs}
          rowData={rowData}
          onGridReady={onGridReady}
          theme={myTheme}
        />
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleSubmitModal}
        initialData={modalData}
      />
    </div>
  );
};

export default UserGameTable;
