const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);
config.resolver.assetExts.push('mdx', 'json');
config.resolver.sourceExts.push('mdx', 'json');

module.exports = config;
