module.exports = {
    "env": {
        "es6": true,
        "node": true
    },
    "extends": [
        "airbnb", "prettier"
    ],
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    "plugins": ["prettier", "import"],
    "rules": {
        "prettier/prettier": ["error"]
    }
};
  