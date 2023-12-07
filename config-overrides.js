const webpack = require('webpack');
module.exports = function override(config, env) {
    config.resolve.fallback = {
        url: require.resolve('url/'),
        path: require.resolve('path-browserify'),
        buffer: require.resolve('buffer/'),
        crypto: require.resolve("crypto-browserify"),
        stream: require.resolve("stream-browserify"),
        zlib: require.resolve("browserify-zlib"),
        http: require.resolve("stream-http"),
        querystring: require.resolve("querystring-es3"),
        util: require.resolve("util/"),
        assert: require.resolve("assert/"),
        fs: false,
        os: false,
    };
    config.plugins.push (
        new webpack.ProvidePlugin({
            process: 'process/browser',
            Buffer: ['buffer', 'Buffer'],
        }),
    );

    return config;
}