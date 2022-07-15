const WebpackBundleAnalyzer = require('webpack-bundle-analyzer');
const {merge} = require('webpack-merge');
const common = require('./webpack.common.js');
const path = require('path');
const glob = require('glob');
const PurgecssPlugin = require('purgecss-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require("terser-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

const PATHS = {
    src: path.join(__dirname, 'src')
}

module.exports = merge(common, {
        mode: 'production',
        optimization: {
            minimizer: [new CssMinimizerPlugin(), new TerserPlugin()],
        },
        plugins: [
            new MiniCssExtractPlugin({
                filename: "[name].css",
            }),
            new PurgecssPlugin({
                paths: glob.sync(`${PATHS.src}/**/*`, {nodir: true}),
            }),
            new WebpackBundleAnalyzer.BundleAnalyzerPlugin()
        ]
    }
)
