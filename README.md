<div align="center">
<h1>✔️⛓️❌</h1>
</div>
<h3 align="center" style="margin-bottom: 20px">chain-validator-js</h3>

<div align="center">

[![Status](https://img.shields.io/badge/status-active-success.svg)]()
[![GitHub Issues](https://img.shields.io/github/issues/denni-hill/chain-validator-js.svg)](https://github.com/denni-hill/chain-validator-js/issues)
[![GitHub Pull Requests](https://img.shields.io/github/issues-pr/denni-hill/chain-validator-js.svg)](https://github.com/denni-hill/chain-validator-js/pulls)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](/LICENSE)

</div>

---

<p align="center"> Easy to use and informative validation tool based on validator.js npm package
    <br> 
</p>

## 📝 Table of Contents

- [About](#about)
- [Getting Started](#getting_started)
- [Authors](#authors)
- [Acknowledgments](#acknowledgement)

## 🧐 About <a name = "about"></a>

This tool is developed to write easy-to-[read, write, reuse] data validation. It provides intuitive chain syntax, implements all the npm validator.js package validators and sanitizers methods and can be extended by your own.

## 🏁 Getting Started <a name = "getting_started"></a>

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See [deployment](#deployment) for notes on how to deploy the project on a live system.

## Installation

To install this library you can use npm or build it from sources.

Using npm:

```
npm install chain-validator-js --save
```

## Code examples

Validate any data

### Strings

```JS
validate(
    "validate me", 
    build().isString().contains("me")
).then(result => console.log(result));
```

Expected output

```JSON
{
  "validated": "validate me",
  "errors": []
}
```

### Arrays

```JS
validate(["validate", "123"],
    [
        build().isArray(),
        build().isNumeric().withMessage("Given value is not type of numeric")
    ]).then(result => console.log(JSON.stringify(result)));
```

```JSON
{
  "validated": [],
  "errors": [
    {
      "value": "validate",
      "message": "Given value is not type of numeric",
      "args": {
        "negate": false
      },
      "path": [
        "0"
      ]
    },
    {
      "value": "me",
      "message": "Given value is not type of numeric",
      "args": {
        "negate": false
      },
      "path": [
        "1"
      ]
    }
  ]
}
```

## ✍️ Authors <a name = "authors"></a>

- [@denni_hill](https://github.com/denni-hill) - Idea & Initial work.

See also the list of [contributors](https://github.com/denni-hill/chain-validator-js/contributors) who participated in this project.

## 🎉 Acknowledgements <a name = "acknowledgement"></a>

- [validator.js](https://www.npmjs.com/package/validator) - all the included validation and sanitizing methods.
- Inspired by [express-validator](https://github.com/express-validator/express-validator) - has the almost same functional, except the lack of informative errors.
