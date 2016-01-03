"use strict";

// dependencies
const fs = require("fs");
const path = require("path");
const sass = require("node-sass");
const webpack = require("webpack");

/* compile stylesheets */

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

/* bundle javascript */

process.stdout.write("Bundling JS...");

webpack({
    entry: {
        salat: path.join(__dirname, "../app/salat.js"),
        qibla: path.join(__dirname, "../app/qibla.js"),
        settings: path.join(__dirname, "../app/settings.js")
    },
    output: {
        path: path.join(__dirname, "../static/js"),
        filename: "[name].bundle.js"
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: "babel-loader",
                query: {
                    presets: ["es2015", "stage-2"]
                }
            }
        ]
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin()
    ]
}, (err, res) => {
    if (err) throw err;

    process.stdout.write(" Done!\n");
    process.exit(0);
});
