// babel.config.js
module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./'],
        alias: {
          '@app': './src/app',
          '@theme': './src/theme',
        },
        extensions: [
          '.ios.ts',
          '.android.ts',
          '.ts',
          '.tsx',
          '.js',
          '.jsx',
          '.json',
        ],
      },
    ],
    // MUST be last:
    'react-native-reanimated/plugin',
  ],
};
