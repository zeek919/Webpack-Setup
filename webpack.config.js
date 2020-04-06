const path = require('path');
const PrettierPlugin = require('prettier-webpack-plugin');
const HtmlWebPackPlugin = require('html-webpack-plugin');

module.exports = env => {
    const config = {
        entry: './src/index.tsx',
        output: {
            filename: 'main.js',
            path: path.resolve(__dirname, 'dist'),
        },
        resolve: {
            extensions: ['*', '.js', '.tsx', '.ts', '.scss', ".json"],
            alias: {
                style: path.resolve(__dirname, 'src', 'style')
            }
        },
        mode: "development",
        watch: true,
        devtool: 'inline-source-map',
        devServer: {
            contentBase: './dist',
            hot: true,
        },
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    loader: "babel-loader"
                },
                {
                    test: /\.tsx?$/,
                    loader: "ts-loader"
                },
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    loader: 'eslint-loader',
                },
                {
                    enforce: "pre",
                    test: /\.js$/,
                    loader: "source-map-loader"
                },
                {
                    test: /\.scss$/,
                    use: [
                        { loader: "style-loader" },
                        { loader: "css-modules-typescript-loader" },
                        {
                            loader: "css-loader",
                            options: {
                                modules: true,
                                localIdentName:
                                    env === "production"
                                        ? "[hash:base64]"
                                        : "[path][name]__[local]--[hash:base64:5]",
                            },
                        },
                        { loader: "sass-loader" },
                    ],
                },
            ]

        },
        plugins: [
            new PrettierPlugin(),
            new HtmlWebPackPlugin({
                template: './src/index.html',
                filename: './index.html',
            })
        ],

    }

    return config;
};
