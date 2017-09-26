const path = require("path");
const glob = require("glob");
const webpack = require("webpack");
const merge = require("webpack-merge");
const extractTextPlugin = require("extract-text-webpack-plugin");

module.exports = () => {
    const isProduction = process.argv.indexOf('-p') !== -1;

    const sharedConfig = () => ({
        stats: { modules: false },
        resolve: { extensions: [".js", ".jsx", ".ts", ".tsx", ".css", ".scss"] },
        output: {
            filename: "[name].js",
            publicPath: "/dist/"
        },
        module: {
            rules: [
                { 
                    test: /\.tsx?$/,
                    include: /Client/,
                    use: [
                        "react-hot-loader/webpack",
                        "ts-loader"
                    ]
                },
                {
                    test: /\.(png|svg|jpe?g|gif)$/,
                    loader: "url-loader",
                    options: {
                        limit: 1,
                        name: "[hash].[ext]"
                    }
                }
            ]
        }
    });

    var extractPlugin = new extractTextPlugin({
        filename: "main.css",
        allChunks: true,
        disable: false
    });

    const clientBundleOutputDir = "./wwwroot/dist";
    const clientBundleConfig = merge(sharedConfig(), {
        entry: {
            "main-client": [
                "react-hot-loader/patch",
                path.join(__dirname, "Client", "bootClient.tsx")
            ]
        },
        module: {
            rules: [
                {
                    test: /\.s?css$/,
                    use: ["css-hot-loader"].concat(extractPlugin.extract({
                        use: [
                            { loader: "css-loader", options: { sourceMap: true } },
                            { loader: "resolve-url-loader", options: { sourceMap: true } },
                            { loader: "postcss-loader", options: { sourceMap: true } },
                            { loader: "sass-loader", options: { sourceMap: true } }
                        ]
                    }))
                }
            ]
        },
        output: {
            path: path.join(__dirname, clientBundleOutputDir)
        },
        plugins: [
            extractPlugin,
            new webpack.DllReferencePlugin({
                context: path.join(__dirname, "..", ".."),
                manifest: require(path.join(__dirname, 'wwwroot', 'dist', 'vendor-manifest.json'))
            })
        ].concat(isProduction ? [
            new webpack.optimize.UglifyJsPlugin()
        ] : [
            new webpack.SourceMapDevToolPlugin({
                filename: "[file].map",
                moduleFilenameTemplate: path.relative(clientBundleOutputDir, "[resourcePath]")
            })
        ])
    });

    const serverBundleConfig = merge(sharedConfig(), {
        resolve: { mainFields: ["main"] },
        entry: {
            "main-server": [
                path.join(__dirname, "Client", "bootServer.tsx")
            ]
        },
        module: {
            rules: [
                {
                    test: /\.s?css$/,
                    use: [
                        { loader: "css-loader", options: { sourceMap: true } },
                        { loader: "resolve-url-loader", options: { sourceMap: true } },
                        { loader: "postcss-loader", options: { sourceMap: true } },
                        { loader: "sass-loader", options: { sourceMap: true } }
                    ]
                }
            ]
        },
        plugins: [
            new webpack.DllReferencePlugin({
                context: path.join(__dirname, "..", ".."),
                manifest: require(path.join(__dirname, 'Client', 'dist', 'vendor-manifest.json')),
                sourceType: "commonjs2",
            })
        ],
        output: {
            libraryTarget: "commonjs",
            path: path.join(__dirname, "./Client/dist")
        },
        target: "node",
        devtool: isProduction ? "none" : "eval-source-map"
    });

    return [clientBundleConfig, serverBundleConfig];
}