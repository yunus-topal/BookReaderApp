// babel.config.js
module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    ['module-resolver', {
      root: ['./src'],
      alias: {
        '@theme': './src/theme',
        '@app': './src/app',
      }
    }],
    // MUST be last:
    'react-native-reanimated/plugin',
  ],
};
