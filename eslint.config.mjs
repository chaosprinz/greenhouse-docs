import { FlatCompat } from "@eslint/eslintrc";

const compat = new FlatCompat({
  baseDirectory: import.meta.url,
});

export default [
  ...compat.config({
    extends: [
      "next/core-web-vitals", // Next.js recommended rules
      "plugin:prettier/recommended", // Prettier integration
    ],
  }),
  {
    rules: {
      // --- Variable usage ---
      "no-unused-vars": ["warn", { argsIgnorePattern: "^_" }], // warn, ignore args starting with _
      "no-undef": "error", // prevent undefined variables

      // --- React / JSX ---
      "react/react-in-jsx-scope": "off", // not needed in React 17+
      "react/prop-types": "off", // TS users don’t need prop-types

      // --- Code style / readability ---
      "no-console": ["warn", { allow: ["warn", "error"] }], // allow console.warn / console.error
      "prefer-const": "warn", // suggest const when possible
      eqeqeq: ["error", "always"], // always use ===
      curly: "error", // require curly braces for blocks

      // --- Next.js specific ---
      "jsx-a11y/anchor-is-valid": "warn", // Next.js Link accessibility
      "react-hooks/rules-of-hooks": "error", // enforce hook rules
      "react-hooks/exhaustive-deps": "warn", // warn on missing deps
    },
  },
];
