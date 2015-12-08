"use strict";

// dependencies
const fs = require("fs");
const path = require("path");
const sass = require("node-sass");

process.stdout.write("Compiling SASS...");

const srcFolder = path.join(__dirname, "../app/styles");
const destFolder = path.join(__dirname, "../static/css");

const src = path.join(srcFolder, "default.scss");
const dest = path.join(destFolder, "default.css");

const result = sass.renderSync({
    file: src,
    outFile: dest,
    outputStyle: "compressed",
});

if (!fs.existsSync(destFolder))
    fs.mkdirSync(destFolder);

fs.writeFileSync(dest, result.css);

process.stdout.write(" Done!\n");
