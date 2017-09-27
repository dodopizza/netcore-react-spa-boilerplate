const path = require("path");
const webpack = require("webpack");
const merge = require("webpack-merge");

module.exports = () => {
    const isProduction = process.argv.indexOf('-p') !== -1;

    const sharedConfig = {
        stats: { modules: false },
        resolve: { extensions: [".js"] },
        entry: {
            vendor: [
                "axios",
                "history",
                "react",
                "react-dom",
                "react-redux",
                "redux",
                "redux-thunk",
                "redux-first-router",
                "react-hot-loader"
            ]
        },
        output: {
            publicPath: "/dist/",
            filename: "[name].js",
            library: "[name]_[hash]"
        },
        plugins: [
            new webpack.DefinePlugin({
                "process.env.NODE_ENV": isProduction ? '"production"' : '"development"'
            })
        ]
    };

    const clientBundleConfig = merge(sharedConfig, {
        output: { path: path.join(__dirname, "wwwroot", "dist") },
        plugins: [
            new webpack.DllPlugin({
                context: __dirname,
                path: path.join(__dirname, "wwwroot", "dist", "[name]-manifest.json"),
                name: "[name]_[hash]"
            })
        ].concat(isProduction ? [new webpack.optimize.UglifyJsPlugin()] : [])
    });

    const serverBundleConfig = merge(sharedConfig, {
        target: "node",
        resolve: { mainFields: ["main"] },
        output: {
            path: path.join(__dirname, "Client", "dist"),
            libraryTarget: "commonjs2"
        },
        entry: {
            vendor: [
                "aspnet-prerendering",
                "react-dom/server"
            ]
        },
        plugins: [
            new webpack.DllPlugin({
                context: __dirname,
                path: path.join(__dirname, "Client", "dist", "[name]-manifest.json"),
                name: "./[name]"
            })
        ]
    });

    return [clientBundleConfig, serverBundleConfig];
}