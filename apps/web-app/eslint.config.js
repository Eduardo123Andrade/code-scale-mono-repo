import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
import pluginSonar, { rules } from "eslint-plugin-sonarjs";


export default [
  { files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"] },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  pluginSonar.configs.recommended,
  {
    // overrides: [
    //   {
    //     files: ["*.spec.ts"],
    //     rules: {
    //       'max-nested-callbacks': ['error', 5]
    //     }
    //   }
    // ]
  }
  // rules: {}
];