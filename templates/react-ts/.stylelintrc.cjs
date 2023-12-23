module.exports = {
  extends: [
    'stylelint-config-standard',
    'stylelint-config-css-modules',
    'stylelint-prettier/recommended'
  ],
  overrides: [
    {
      files: ['**/*.less'],
      customSyntax: 'postcss-less'
    }
  ],
  rules: {
    "declaration-property-value-no-unknown": true,
    'no-descending-specificity': null,
    'block-no-empty': null,
  },
};
