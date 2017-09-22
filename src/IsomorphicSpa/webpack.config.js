const path = require("path");
const glob = require("glob");
const webpack = require("webpack");
const merge = require("webpack-merge");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = (env) => {
	const isDevBuild = !(env && env.prod);
	
		var ExtractPlugin = new ExtractTextPlugin({
			filename: "main.css",
			allChunks: true,
			disable: false
		});	
	
		const imageLoader = {
			test: /\.(png|svg|jpe?g|gif)$/,
			loader: "url-loader",
			options: {
				limit: 1,
				name: "[hash].[ext]"
			}
		};

	const sharedConfig = () => ({
		stats: { modules: false },
		resolve: { extensions: [".js", ".jsx", ".ts", ".tsx", ".css", ".scss"] },
		output: {
			filename: "[name].js",
			publicPath: "/dist/"
		},
		module: {
			rules: [
				{ test: /\.tsx?$/, include: /Client/, use: [ "react-hot-loader/webpack", "ts-loader" ] },
				imageLoader
			]
		}
	});

	const clientBundleOutputDir = "./wwwroot/dist";
	const clientBundleConfig = merge(sharedConfig(), {
		entry: { 
			"main-client": [
				"react-hot-loader/patch",
				"./Client/bootClient.tsx"
			]
		},
		module: {
			rules: [
				{
					test: /\.s?css$/,
					use: ["css-hot-loader"].concat(ExtractPlugin.extract({
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
		output: { path: path.join(__dirname, clientBundleOutputDir) },
		plugins: [
			ExtractPlugin,
			new webpack.DllReferencePlugin({
				context: __dirname,
				manifest: require("./wwwroot/dist/vendor-manifest.json")
			})
		].concat(isDevBuild ? [
			new webpack.SourceMapDevToolPlugin({
				filename: "[file].map",
				moduleFilenameTemplate: path.relative(clientBundleOutputDir, "[resourcePath]")
			})
		] : [
			new webpack.optimize.UglifyJsPlugin()
		])
	});

	const serverBundleConfig = merge(sharedConfig(), {
		resolve: { mainFields: ["main"] },
		entry: { 
			"main-server": [
				"./Client/bootServer.tsx"
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
			ExtractPlugin,
			new webpack.DllReferencePlugin({
				context: __dirname,
				manifest: require("./Client/dist/vendor-manifest.json"),
				sourceType: "commonjs2",
				name: "./vendor"
			})
		],
		output: {
			libraryTarget: "commonjs",
			path: path.join(__dirname, "./Client/dist")
		},
		target: "node",
		devtool: "eval-source-map"
	});

	return [clientBundleConfig, serverBundleConfig];
}