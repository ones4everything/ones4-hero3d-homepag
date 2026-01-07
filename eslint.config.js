import js from "@eslint/js";
import tseslint from "typescript-eslint";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import globals from "globals";

export default [
  { ignores: ["dist/**", "build/**", "node_modules/**"] },

  js.configs.recommended,

  // TS + TSX support
  ...tseslint.configs.recommended,

  // React/TSX files
  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: { jsx: true },
      },
      globals: {
        ...globals.browser,
      },
    },
    plugins: {
      react,
      "react-hooks": reactHooks,
    },
    settings: { react: { version: "detect" } },
    rules: {
      ...reactHooks.configs.recommended.rules,
    },
  },

  // Node config files (Tailwind/Vite/etc)
  {
    files: [
      "tailwind.config.*",
      "postcss.config.*",
      "vite.config.*",
      "*.config.{js,cjs,mjs}",
    ],
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
  },
];
