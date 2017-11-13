let merge = require("webpack-merge");
let path = require("path");
let common = require("./webpack.common.js");
let UglifyJSPlugin = require("uglifyjs-webpack-plugin");

module.exports = merge(common, {
    plugins: [
        new UglifyJSPlugin()
    ]
});