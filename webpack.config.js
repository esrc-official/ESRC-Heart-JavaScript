'use strict';
const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    entry: {
        index: ["./src/js/index.js", "./src/scss/index.scss"]
    },
    output: {
        path: path.resolve(__dirname, "./dist"),
        filename: "sample.[name].js",
        library: '[name]',
        libraryExport: 'default',
        libraryTarget: 'umd',
        publicPath: 'dist'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        configFile: "./.babelrc"
                    }
                }
            },
            {
                test: /\.scss$/,
                exclude: /node_modules/,
                use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"] 
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "sample.[name].css"
        })
    ]
};