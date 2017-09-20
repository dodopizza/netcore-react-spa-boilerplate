const path = require("path");
const webpack = require("webpack");
const merge = require("webpack-merge");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = (env) => {
    const isDevBuild = !(env && env.prod);
    const extractCSS = new ExtractTextPlugin("vendor.css");

    const sharedConfig = {
        stats: { modules: false },
        resolve: { extensions: [".js"] },
        entry: {
            vendor: [
                "history",
                "react",
                "react-dom",
                "react-redux",
                "redux",
                "redux-thunk"
            ]
        },
        output: {
            publicPath: "/dist/",
            filename: "[name].js",
            library: "[name]_[hash]"
        },
        plugins: [
            new webpack.DefinePlugin({
                "process.env.NODE_ENV": isDevBuild ? ""development"" : ""production""
            })
        ]
    };

    const clientBundleConfig = merge(sharedConfig, {
        output: { path: path.join(__dirname, "wwwroot", "dist") },
        module: {
            rules: [
                { test: /\.css(\?|$)/, use: extractCSS.extract({ use: isDevBuild ? "css-loader" : "css-loader?minimize" }) }
            ]
        },
        plugins: [
            extractCSS,
            new webpack.DllPlugin({
                path: path.join(__dirname, "wwwroot", "dist", "[name]-manifest.json"),
                name: "[name]_[hash]"
            })
        ].concat(isDevBuild ? [] : [
            new webpack.optimize.UglifyJsPlugin()
        ])
    });

    const serverBundleConfig = merge(sharedConfig, {
        target: "node",
        resolve: { mainFields: ["main"] },
        output: {
            path: path.join(__dirname, "Client", "dist"),
            libraryTarget: "commonjs2"
        },
        module: {
            rules: [{ test: /\.css(\?|$)/, use: isDevBuild ? "css-loader" : "css-loader?minimize" }]
        },
        entry: {
            vendor: [
                "aspnet-prerendering",
                "react-dom/server"
            ]
        },
        plugins: [
            new webpack.DllPlugin({
                path: path.join(__dirname, "Client", "dist", "[name]-manifest.json"),
                name: "[name]_[hash]"
            })
        ]
    });

    return [clientBundleConfig, serverBundleConfig];
}