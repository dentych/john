let HtmlWebpackPlugin = require("html-webpack-plugin");
let CopyWebpackPlugin = require("copy-webpack-plugin");
let UglifyJSPlugin = require("uglifyjs-webpack-plugin");
let path = require("path");

module.exports = {
    entry: {
        game: path.join(__dirname, "src/app.ts")
    },
    output: {
        filename: "bundle.js",
        path: path.join(__dirname, "dist")
    },
    resolve: {
        extensions: [".ts", ".js"],
        alias: {
            pixi: path.join(__dirname, "node_modules/phaser-ce/build/custom/pixi.js"),
            phaser: path.join(__dirname, "node_modules/phaser-ce/build/custom/phaser-split.js"),
            p2: path.join(__dirname, "node_modules/phaser-ce/build/custom/p2.js"),
            assets: path.join(__dirname, "assets/")
        }
    },
    module: {
        rules: [
            // { test: /\.ts$/, enforce: "pre", loader: "tslint-loader" },

            {test: /pixi\.js$/, loader: "expose-loader?PIXI"},
            {test: /phaser-split\.js$/, loader: "expose-loader?Phaser"},
            {test: /p2\.js$/, loader: "expose-loader?p2"},
            {test: /\.ts$/, loader: "ts-loader", exclude: "/node_modules/"}
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/index.html"
        }),
        new CopyWebpackPlugin([
            {from: "assets", to: "assets"}
        ])
    ]
};