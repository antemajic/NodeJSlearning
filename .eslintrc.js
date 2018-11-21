module.exports = {
    "env": {
        "node": true,
        "es6": true
    },
    "extends": "eslint:recommended",
    "parserOptions": {
        "ecmaVersion": 2017
    },
    "rules": {
        "indent": [
            "error",
            4
        ],
        "semi": [
            "error",
            "always"
        ],
        "quotes": [
            "error", "single",
            { "avoidEscape": true, "allowTemplateLiterals": true }
        ],
        "no-console": 0,
    }
 };