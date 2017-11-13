let merge = require("webpack-merge");
let path = require("path");
let common = require("./webpack.common.js");

module.exports = merge(common, {
    devtool: "inline-source-map",
    devServer: {
        contentBase: path.join(__dirname, "dist"),
        watchOptions: {
            aggregateTimeout: 100,
            ignored: /node_modules/
        }
    }
});