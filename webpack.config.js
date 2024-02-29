const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const {
    CleanWebpackPlugin,
} = require("clean-webpack-plugin");
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

module.exports = {
    mode: "development",
    devServer: {
        compress: true,
        port: 9000,
        open: true,
        hot: true,
    },
    // entry: "./src/js/index.js",
    entry: "./src/js/index.ts",
    output: {
        filename: "[name].chunkhash.[chunkhash].js",
        path: path.resolve(__dirname, "dist"),
        assetModuleFilename: "images/[name][ext]",
        clean: true,
    },

    resolve: {
        extensions: [".js", ".ts", ".scss", ".css"],
    },

    module: {
        rules: [
            // Babel loader
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env"],
                        plugins: [
                            "@babel/plugin-transform-class-properties",
                        ],
                    },
                },
            },
            // Typescript loader
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                use: "ts-loader",
            },
            // Css loader
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                ],
            },
            // Scss loader
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    "sass-loader",
                ],
            },
            //html loader
            {
                test: /\.html$/,
                use: "html-loader",
            },

            // Image loader
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                type: "asset/resource",
            },
        ],
    },

    optimization: {
        minimizer: [
            new ImageMinimizerPlugin({
                minimizer: {
                    implementation:
                        ImageMinimizerPlugin.sharpMinify,
                },
                generator: [
                    {
                        type: "asset",
                        implementation:
                            ImageMinimizerPlugin.sharpGenerate,
                        options: {
                            encodeOptions: {
                                webp: {
                                    quality: 90,
                                },
                            },
                        },
                    },
                ],
            }),
            new CssMinimizerPlugin(),
        ],
        runtimeChunk: "single",
    },

    plugins: [
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: "[name].css",
            chunkFilename: "[id].css",
        }),
        new HtmlWebpackPlugin({
            template: "./src/index.html",
        }),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: "src/images/*.(jpe?g|png|gif|svg)",
                    to: "images/[name][ext]",
                },
            ],
        }),
    ],
};
