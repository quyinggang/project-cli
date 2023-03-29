module.exports = {
  extends: [require.resolve('@umijs/fabric/dist/stylelint')],
  customSyntax: 'postcss-less',
  rules: {
    'no-descending-specificity': null,
    'block-no-empty': null
  },
}
