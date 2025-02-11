import { themeQuartz } from "ag-grid-community";

export const myTheme = themeQuartz.withParams({
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
