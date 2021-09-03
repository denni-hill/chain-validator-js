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

### Prerequisites

For today to get this package you should clone this repository. <br>

Then you should run few commands written below

```
npm install

npm run build
```

After just copy the contents of build folder to your project and import build() and validate() functions from destination folder. As it's dependency, validator.js npm package, this package also can be used both in browser and nodejs environment.

## ✍️ Authors <a name = "authors"></a>

- [@denni_hill](https://github.com/denni-hill) - Idea & Initial work

See also the list of [contributors](https://github.com/denni-hill/chain-validator-js/contributors) who participated in this project.

## 🎉 Acknowledgements <a name = "acknowledgement"></a>

- [validator.js](https://www.npmjs.com/package/validator) - all the included validation and sanitizing methods.
- Inspired by [express-validator](https://github.com/express-validator/express-validator) - has the almost same functional, except the lack of informative errors
