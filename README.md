# ESRC Heart for JavaScript
This is full screen bio-analysis sample using the [ESRC Heart SDK](https://github.com/esrc-official/ESRC-Heart-SDK-JavaScript) for desktop browsers.

[![Platform](https://img.shields.io/badge/platform-JAVASCRIPT-orange.svg)](https://github.com/esrc-official/ESRC-Heart-JavaScript)
[![Languages](https://img.shields.io/badge/language-JAVASCRIPT-orange.svg)](https://github.com/esrc-official/ESRC-Heart-JavaScript)
[![Commercial License](https://img.shields.io/badge/License-Commercial-brightgreen.svg)](https://github.com/esrc-official/ESRC-Heart-JavaScript/blob/master/LICENSE.md)

## Run the sample
1. Install packages

> Require that you have Node v8.x+ installed.

```bash
npm install
```

2. Run
```bash
npm run start
```

## Customizing the sample
if you want to put some changes into the sample, you should build it using `webpack`.

1. Install packages

> Require that you have Node v8.x+ installed.

```bash
npm install
```

2. Modify files
If you want to change `APP_ID`, change `APP_ID` in `./src/js/const.js` to the other `APP_ID` you want.

3. Build the sample
When the modification is complete, you'll need to bundle the file using `webpack`. The bundled files are created in the `dist` folder.
Please check `webpack.config.js` for settings.

```bash
npm run build
```

4. Run
```bash
npm run start
```

> The `npm run start` command contains `npm run build`. Check the scripts part of the package.json file.