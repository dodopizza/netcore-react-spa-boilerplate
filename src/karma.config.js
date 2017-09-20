// Base config
// Use this as base config

module.exports = function(config) {
    return {
        basePath: "Client/__tests__",
        frameworks: ["mocha", "chai", "sinon"],
        files: [
            "**/*.spec.tsx"
        ],
        preprocessors: {
            "**/*.tsx": ["webpack", "sourcemap"]
        },
        webpackMiddleware: {
            stats: "errors-only"
        },
        webpack: {
            devtool: "inline-source-map",
            module: {
                rules: [
                    { 
                        test: /\.tsx?$/, include: /Client/, 
                        use: [{ 
                            loader: "ts-loader",
                            options: {
                                transpileOnly: true
                            }
                        }]
                    },
                    {
                        test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico|scss|css)$/,
                        use: ["null-loader"]
                    }
                ]
            },
            resolve: {
                extensions: [".js", ".ts", ".tsx", ".json"]
            },
            externals: {
                "react/addons": true,
                "react/lib/ExecutionEnvironment": true,
                "react/lib/ReactContext": "window"
            }
        },
        reporters: ["progress"],
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: false,
        singleRun: true,
        browsers: ["PhantomJS"],
        concurrency: Infinity
    };
}