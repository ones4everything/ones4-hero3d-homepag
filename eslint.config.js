// eslint.config.js
import js from "@eslint/js";
import globals from "globals";

export default [
  // Ignore build output
  { ignores: ["dist/**", "build/**", "node_modules/**"] },

  // Base recommended rules
  js.configs.recommended,

  // Your project rules
  {
    files: ["**/*.{js,cjs,mjs,ts,tsx,jsx}"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    rules: {
      // add any custom rules here
    },
  },
];
