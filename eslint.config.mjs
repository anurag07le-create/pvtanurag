import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // The current route is the Netflix-style experience. These earlier
    // Bollywood/Three.js drafts are kept as references but are not shipped.
    "src/components/sections/**",
    "src/components/three/**",
    "src/components/ui/**",
    "src/hooks/**",
  ]),
]);

export default eslintConfig;
