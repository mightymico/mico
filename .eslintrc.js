module.exports = {
  "extends": ["airbnb", "prettier", "plugin:jest/recommended"],
  "plugins": [
    "import",
    "prettier",
    "jest",
  ],
  "env": {
    node: true,
    browser: true,
    es6: true,
    "jest/globals": true,
  },
  rules: {
    strict: ["error", "global"],
    "indent": [
      "error",
      2,
      {
        "SwitchCase": 1
      }
    ],
    "linebreak-style": [
      "off",
      "unix"
    ],
    "quotes": [
      "error",
      "single"
    ],
    "semi": [
      "error",
      "always"
    ],
    "comma-dangle": 0,
    "import/no-extraneous-dependencies": ["error", {
      devDependencies: true
    }],
    "no-console": 0,
    "jsx-a11y/anchor-is-valid": ["warn", {
      "components": ["Link"],
      "specialLink": ["hrefLeft", "hrefRight", "to"],
      "aspects": ["noHref", "invalidHref", "preferButton"]
    }],
    "global-require": 0,
    "no-underscore-dangle": 0,
    "react/jsx-filename-extension": [1, {
      "extensions": [".js", ".jsx"]
    }],
    "prettier/prettier": ["warn", {
      "singleQuote": true
    }],
  },
  "parserOptions": {
    ecmaVersion: 6,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true
    }
  },
};
