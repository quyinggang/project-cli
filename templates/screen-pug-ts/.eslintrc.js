module.exports = {
  extends: [require.resolve("@umijs/fabric/dist/eslint")],
  rules: {
    "@typescript-eslint/no-this-alias": 'off',
    "@typescript-eslint/no-unused-expressions": 'off',
    quotes: [
      "error",
      "single",
      {
        avoidEscape: true,
        allowTemplateLiterals: true,
      },
    ],
  },
};
