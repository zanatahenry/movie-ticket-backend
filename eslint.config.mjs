import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";


export default [
  {files: ["**/*.{js,mjs,cjs,ts}"]},
  {languageOptions: { globals: globals.browser }},
  { rules: 
    { 
      semi: "never", 
      "prefer-const": "error",
      "no-duplicate-imports": "error",
      "no-duplicate-case": "error",
      "no-useless-return": "error",
      "camelcase": "error"
    } 
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
];