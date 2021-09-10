module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  extends: [
    "plugin:prettier/recommended",
    "plugin:@typescript-eslint/recommended"
  ],
  plugins: ["@typescript-eslint", "prettier"],
  rules: {
    "prettier/prettier": [
      "error",
      {
        endOfLine: "auto",
        trailingComma: "none"
      }
    ],
    "@typescript-eslint/no-explicit-any": "off",
    quotes: ["error", "double"],
    semi: ["error", "always"],
    "no-console": "off"
  }
};
