import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import pluginReact from "eslint-plugin-react";

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 2021,
        sourceType: "module",
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: { ...globals.browser, ...globals.node },
    },
    plugins: {
      "@typescript-eslint": tseslint,
      react: pluginReact,
    },
    rules: {
      semi: ["error", "always"],
      quotes: ["error", "double"],
      "react/react-in-jsx-scope": "off",
    },
  },
  pluginJs.configs.recommended,
  tseslint.configs.recommended,
  pluginReact.configs.recommended,
];
