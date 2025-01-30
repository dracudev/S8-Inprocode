import { useCallback, useMemo, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import { Game } from "@/types/types";
import {
  ModuleRegistry,
  AllCommunityModule,
  GridReadyEvent,
  ColDef,
  ICellRendererParams,
} from "ag-grid-community";
import {
  GamePhotoRenderer,
  OptionsCellRenderer,
  CreateButtonHeader,
} from "./cell-renderer";
import { myTheme } from "./my-theme";
import Modal from "./modal";
import { handleCreate, handleUpdate } from "@/utils/crud";
import useFetch from "@/hooks/use-fetch";

ModuleRegistry.registerModules([AllCommunityModule]);

interface CellRendererProps extends ICellRendererParams {
  data: Game;
}

const UserGameTable: React.FC = () => {
  const [refresh, setRefresh] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalData, setModalData] = useState<Game | undefined>(undefined);

  const { data: rowData, loading, error } = useFetch("/games", [refresh]);

  const updateRowData = (): void => {
    setRefresh((prev) => !prev);
  };

  const handleOpenModal = (data?: Game): void => {
    if (data) {
      const modalFormData: Game = data;
      setModalData(modalFormData);
    } else {
      setModalData(undefined);
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = (): void => {
    setIsModalOpen(false);
    setModalData(undefined);
  };

  const handleSubmitModal = async (formData: Game): Promise<void> => {
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
  const defaultColDef = useMemo<ColDef>(() => ({ flex: 1 }), []);

  const [columnDefs] = useState<ColDef[]>([
    {
      headerName: "Photo",
      field: "photo",
      cellRenderer: GamePhotoRenderer,
    },
    {
      headerName: "Title",
      field: "title",
    },
    {
      headerName: "Platform",
      field: "platform",
      valueFormatter: (params) => {
        // Assuming the object has a 'name' property
        return params.value.platform;
      },
    },
    {
      headerName: "Genre",
      field: "genre",
      valueFormatter: (params) => {
        // Assuming the object has a 'name' property
        return params.value.genre;
      },
    },
    {
      headerName: "Options",
      field: "options",
      cellRenderer: (params: CellRendererProps) => (
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
    (params: GridReadyEvent) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (params.api as any).setRowData(rowData);
    },
    [rowData]
  );

  if (loading)
    return (
      <div className="w-full h-full flex items-center justify-center">
        Loading...
      </div>
    );
  if (error)
    return (
      <div className="w-full h-full flex items-center justify-center text-red-500">
        Error: {error}
      </div>
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
