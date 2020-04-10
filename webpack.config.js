const path = require('path');
const webpack = require('webpack');
const ZipPlugin = require('zip-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ExtensionReloader = require('webpack-extension-reloader');
const WextManifestWebpackPlugin = require('wext-manifest-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const FixStyleOnlyEntriesPlugin = require('webpack-fix-style-only-entries');

const nodeEnv = process.env.NODE_ENV || 'development';
const targetBrowser = process.env.TARGET_BROWSER;

const extensionReloaderPlugin =
    nodeEnv === 'development'
        ? new ExtensionReloader({
              port: 9090,
              reloadPage: true,
              entries: {
                  // TODO: reload manifest on update
                  contentScript: 'contentScript',
                  background: 'background',
                  extensionPage: ['popup', 'options'],
              },
          })
        : () => {
              this.apply = () => {};
          };

const getExtensionFileType = browser => {
    if (browser === 'opera') {
        return 'crx';
    }
    if (browser === 'firefox') {
        return 'xpi';
    }

    return 'zip';
};

module.exports = {
    mode: nodeEnv,

    entry: {
        manifest: './src/manifest.json',
        background: './src/scripts/background.js',
        contentScript: './src/scripts/contentScript.js',
    },

    output: {
        path: path.resolve(__dirname, 'extension', targetBrowser),
        filename: 'js/[name].bundle.js'
    },

    module: {
        rules: [
            {
                type: 'javascript/auto', // prevent webpack handling json with its own loaders,
                test: /manifest\.json$/,
                use: {
                    loader: 'wext-manifest-loader',
                    options: {
                        usePackageJSONVersion: true, // set to false to not use package.json version for manifest
                    },
                },
            },
            {
                test: /.(js|jsx)$/,
                include: [path.resolve(__dirname, 'src/scripts')],
                loader: 'babel-loader',

                options: {
                    plugins: ['syntax-dynamic-import'],

                    presets: [
                        [
                            '@babel/preset-env',
                            {
                                modules: false,
                            },
                        ],
                    ],
                },
            },
            {
                test: /\.scss$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].css',
                            context: './src/styles/',
                            outputPath: 'css/',
                        },
                    },
                    'extract-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: nodeEnv === 'development' ? true : false,
                        },
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            ident: 'postcss',
                            // eslint-disable-next-line global-require
                            plugins: [require('autoprefixer')()],
                        },
                    },
                    'resolve-url-loader',
                    'sass-loader',
                ],
            },
        ],
    },

    plugins: [
        new webpack.ProgressPlugin(),
        new WextManifestWebpackPlugin(),
        new FixStyleOnlyEntriesPlugin({ silent: true }),
        new webpack.EnvironmentPlugin(['NODE_ENV', 'TARGET_BROWSER']),
        new CleanWebpackPlugin({
            cleanOnceBeforeBuildPatterns: [
                path.join(process.cwd(), `extension/${targetBrowser}`),
                path.join(process.cwd(), `extension/${targetBrowser}.${getExtensionFileType(targetBrowser)}`),
            ],
            cleanStaleWebpackAssets: false,
            verbose: true,
        }),
        new CopyWebpackPlugin([{ from: 'src/assets', to: 'assets' }]),
        extensionReloaderPlugin,
    ],

    optimization: {
        minimizer: [
            new TerserPlugin({
                cache: true,
                parallel: true,
                terserOptions: {
                    output: {
                        comments: false,
                    },
                },
                extractComments: false,
            }),
            new OptimizeCSSAssetsPlugin({
                cssProcessorPluginOptions: {
                    preset: ['default', { discardComments: { removeAll: true } }],
                },
            }),
            new ZipPlugin({
                path: path.resolve(__dirname, 'extension'),
                extension: `${getExtensionFileType(targetBrowser)}`,
                filename: `${targetBrowser}`,
            }),
        ],
    },
};
