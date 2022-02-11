// const withPWA = require('next-pwa');
// const runtimeCaching = require('next-pwa/cache');
// const withBundleAnalyzer = require('@next/bundle-analyzer')({
//   enabled: process.env.ANALYZE === 'true',
// });
const webpack = require('webpack');
const path = require('path');
module.exports ={
  future: {
    webpack5: true,
  },
  pwa: {
    dest: 'public',
    // runtimeCaching,
  },
  trailingSlash: true,
  env: {
    stagingMediaURL: '',
  },
  plugins: [
    new webpack.optimize.MinChunkSizePlugin({
      minChunkSize: 10000,
    }),
  ],
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.alias['@sentry/node'] = '@sentry/browser';
    }
    return config;
  },
};
