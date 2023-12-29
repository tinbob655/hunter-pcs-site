
//I HATE WEBPACK 5, I HATE WEBPACK 5, I HATE WEBPACK 5

//three hours later, sobbing has intensified

//questioning life choices

//managed to get down from 1023 errors to 64 progress?

//another 2 hours, considering ejecting project and going back to html

//cried some more, then made the below code
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
        async_hooks: false
    };
    config.plugins.push (
        new webpack.ProvidePlugin({
            process: 'process/browser',
            Buffer: ['buffer', 'Buffer'],
        }),
    );

    return config;
}

//it worked, IT WORKED. GOD IS REAL!!!!! YESSSSSS. I'm gonna burst rn

//Note To Self: the next time you see a webpack > 5 error. Smash your PC, drop computer science and become a carpenter