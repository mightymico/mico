module.exports = {
  "env": {
    "browser": true,
    "node":true,
    "commonjs": true,
    "es6": true,
  },
  "extends": ["eslint:recommended", "plugin:react/recommended"],
  "parserOptions": {
    "ecmaFeatures": {
      "experimentalObjectRestSpread": true,
      "jsx": true
    },
    "sourceType": "module"
  },
  "plugins": [
    "react"
  ],
  "rules": {
    "max-len": [1, 120, 2, {ignoreComments: true}],
    "react/jsx-uses-react": "error",
    "react/jsx-uses-vars": "error",
    "linebreak-style": ["error", "unix"],
    "react/prop-types": [1],
    "no-unused-vars":[2],
    "react/no-unknown-property": [2, { ignore:["class"]}],
    "indent": ["error",2,{ "SwitchCase": 1 }],
    // "quotes": ["error","double"],
    "semi": [0, "always"]
  }
};