module.exports = {
    env: {
      node: true,
      commonjs: true,
      es2021: true,
    },
    extends: ["eslint:recommended", "plugin:prettier/recommended"],
    parserOptions: {
      ecmaVersion: 12,
    },
    rules: {
      // Customize rules as needed
      "no-unused-vars": "warn",
      "no-console": "off",
    }

  };
  