/* eslint-disable */
// @ts-nocheck
import { useCallback, useMemo, useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import {
  ModuleRegistry,
  AllCommunityModule,
  themeQuartz,
} from "ag-grid-community";
// import useFetch from "@/hooks/use-fetch";
import { Game } from "@/types/types";
import defaultImage from "@/assets/default.jpg";
import { GamePhotoRenderer, OptionsCellRenderer } from "./cell-renderer";

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

  useEffect(() => {
    const fetchData = async () => {
      const baseUrl = import.meta.env.VITE_APP_CLIENT_HOST;
      const response = await fetch(`${baseUrl}/games`);
      const result = await response.json();
      const parsedData: Game[] = result.data.map((game) => ({
        id: game.id_game,
        photo: game.photo ? encodeURI(game.photo) : defaultImage,
        title: game.title,
        platform: game.platform.join(", "),
        genre: game.genre.join(", "),
      }));
      setRowData(parsedData);
    };
    fetchData();
  }, [refresh]);

  const updateRowData = () => {
    setRefresh((prev) => !prev);
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
        <OptionsCellRenderer {...params} updateRowData={updateRowData} />
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
    </div>
  );
};

export default UserGameTable;
