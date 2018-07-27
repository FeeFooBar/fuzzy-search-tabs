const path = require("path");
const htmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");



module.exports = {
    mode: "production",
    entry: {
        bundle: ["./src/index.tsx"],
        background: ["./src/background.ts"],
    },
    output: {
        path: path.resolve(__dirname, "build"),
        filename: "[name].js",
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: "awesome-typescript-loader",
                exclude: /node_modules/
            },
            {
                enforce: "pre",
                test: /\.js$/,
                loader: "source-map-loader"
            },
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: "css-loader",
                        options: {
                            module: true,
                            sourceMap: true,
                            importLoader: 2
                        },
                    },
                    "sass-loader"
                ]
            }
        ]
    },
    plugins: [
        new htmlWebpackPlugin({ template: "./html/index.html" }),
        new MiniCssExtractPlugin({
            filename: "[name].css",
            chunkFilename: "[id].css"
        })
    ],
    //enables debugging of tsx files
    devtool: "source-map",
    //importing can work for the files with the below extension. if you import "app", then node will look for app.js, app.ts and app.tsx
    resolve: { extensions: [".js", ".ts", ".tsx"] }
}