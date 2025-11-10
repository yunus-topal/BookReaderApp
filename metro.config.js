const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');

/** @type {import('@react-native/metro-config').MetroConfig} */
const config = {
  // only add things here if you truly need them
  // resolver: { sourceExts: ['ts', 'tsx', 'js', 'jsx', 'json'] }, // RN already has these by default
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
