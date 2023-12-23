module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  // plugin:vue/vue3-recommended配置了其他字段，所以无需再配置vue-eslint-parser等
  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-recommended',
    "plugin:@typescript-eslint/recommended",
    'plugin:prettier/recommended',
  ],
  parser: "vue-eslint-parser",
  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaVersion: 2022,
    sourceType: 'module'
  },
  plugins: ['vue', '@typescript-eslint'],
  rules: {
    eqeqeq: 2,
    'vue/multi-word-component-names': 0,
  },
};
