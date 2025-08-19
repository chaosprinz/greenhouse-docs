import { FlatCompat } from "@eslint/eslintrc";
import tseslint from "@typescript-eslint/eslint-plugin";
import tsparser from "@typescript-eslint/parser";

const compat = new FlatCompat({
  baseDirectory: import.meta.url,
});

export default [
  // Next.js + Prettier presets
  ...compat.config({
    extends: [
      "next/core-web-vitals", // Next.js recommended rules
      "plugin:prettier/recommended", // Prettier integration
    ],
  }),

  // Ignore build & cache dirs
  {
    ignores: ["node_modules", ".next", "out", "dist", "coverage"],
  },

  // TypeScript (syntax-only)
  {
    files: ["**/*.ts", "**/*.tsx"],
    languageOptions: {
      parser: tsparser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        project: false, // <-- IMPORTANT: keeps it syntax-only (fast)
      },
    },
    plugins: {
      "@typescript-eslint": tseslint,
    },
    rules: {
      // --- TypeScript-specific ---
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_" },
      ],
      "@typescript-eslint/no-explicit-any": "off", // up to you
      "@typescript-eslint/ban-ts-comment": "warn",

      // --- Variable usage ---
      "no-undef": "off", // not needed for TS

      // --- React / JSX ---
      "react/react-in-jsx-scope": "off", // not needed in React 17+
      "react/prop-types": "off", // TS users don’t need prop-types

      // --- Code style / readability ---
      "no-console": ["warn", { allow: ["warn", "error"] }],
      "prefer-const": "warn",
      eqeqeq: ["error", "always"],
      curly: "error",

      // --- Next.js specific ---
      "jsx-a11y/anchor-is-valid": "warn",
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",
    },
  },
  {
    files: ["*.config.mjs", ".*.mjs"],
    rules: {
      "import/no-anonymous-default-export": "off",
    },
  },
];
