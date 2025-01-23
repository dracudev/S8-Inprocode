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

// to use myTheme in an application, pass it to the theme grid option
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

const CustomButtonComponent = () => {
  const eGui = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const eButton = document.createElement("button");
    eButton.className = "btn-simple";
    eButton.textContent = "Push Me!";
    const eventListener = () => alert("clicked");
    eButton.addEventListener("click", eventListener);
    eGui.current?.appendChild(eButton);

    return () => {
      eButton.removeEventListener("click", eventListener);
    };
  }, []);

  return <div ref={eGui}></div>;
};

const UserGameTable: React.FC = () => {
  const gridDiv = useRef<HTMLDivElement>(null);
  let gridApi: GridApi;

  useEffect(() => {
    if (gridDiv.current) {
      const gridOptions: GridOptions = {
        rowData: [
          { make: "Tesla", model: "Model Y", price: 64950, electric: true },
          { make: "Ford", model: "F-Series", price: 33850, electric: false },
          { make: "Toyota", model: "Corolla", price: 29600, electric: false },
          { make: "Mercedes", model: "EQA", price: 48890, electric: true },
          { make: "Fiat", model: "500", price: 15774, electric: false },
          { make: "Nissan", model: "Juke", price: 20675, electric: false },
        ],
        columnDefs: [
          {
            headerName: "Make & Model",
            valueGetter: (p: ValueGetterParams) =>
              p.data.make + " " + p.data.model,
            flex: 2,
          },
          {
            field: "price",
            valueFormatter: (p) => "£" + Math.floor(p.value).toLocaleString(),
            flex: 1,
          },
          { field: "electric", flex: 1 },
          { field: "button", cellRenderer: CustomButtonComponent, flex: 1 },
        ],
        theme: myTheme,
      };

      gridApi = createGrid(gridDiv.current, gridOptions);
    }
  }, []);

  return (
    <div
      id="myGrid"
      ref={gridDiv}
      style={{ height: "100%", width: "100%" }}
    ></div>
  );
};

export default UserGameTable;
