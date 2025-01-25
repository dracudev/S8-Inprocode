/* eslint-disable */
// @ts-nocheck

import React, { useEffect, useRef } from "react";
import {
  AllCommunityModule,
  GridApi,
  GridOptions,
  ModuleRegistry,
  ValueGetterParams,
  createGrid,
} from "ag-grid-community";
import { themeQuartz } from "ag-grid-community";
import useFetch from "@/hooks/use-fetch";
import { Game } from "@/types/types";
import defaultImage from "@/assets/default.jpg";
import useGameFetch from "@/hooks/use-fetch-game-img";

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

ModuleRegistry.registerModules([AllCommunityModule]);

const UserGameTable: React.FC = () => {
  const { data, loading, error } = useFetch<DataType[]>("/games");
  const parsedData: Game[] = data?.data.map((game) => ({
    photo: game.photo ? encodeURI(game.photo) : defaultImage,
    title: game.title,
    platform: game.platform.join(", "),
    genre: game.genre.join(", "),
  }));
  console.log(parsedData);
  const gridDiv = useRef<HTMLDivElement>(null);
  let gridApi: GridApi;

  useEffect(() => {
    if (data && gridDiv.current) {
      const gridOptions: GridOptions = {
        rowData: parsedData,
        columnDefs: [
          {
            headerName: "Photo",
            field: "photo",
            cellRenderer: (params) =>
              `<div style="width:100%; height:100%;">
            <img src="${params.value}" alt="Game Photo" style="height:100%;width:auto%; objectFit:cover"/>
            </div>`,
            flex: 2,
          },
          {
            headerName: "Title",
            field: "title",
            flex: 2,
          },
          {
            headerName: "Platform",
            field: "platform",
            flex: 1,
          },
          {
            headerName: "Genre",
            field: "genre",
            flex: 1,
          },
        ],
        theme: myTheme,
        defaultColDef: {
          resizable: true,
          sortable: true,
          filter: true,
        },
        animateRows: true,
        rowHeight: 150,
      };

      gridApi = createGrid(gridDiv.current, gridOptions);
    }
  }, [parsedData]);

  return (
    <div
      id="myGrid"
      ref={gridDiv}
      style={{ height: "100%", width: "100%" }}
    ></div>
  );
};

export default UserGameTable;
