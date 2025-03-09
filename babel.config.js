module.exports = function (api) {
  // Determine the current environment (staging, production)
  const env = process.env.NODE_ENV || 'staging';
  const envPath = `.env.${env}`;
  return {
    presets: ['module:@react-native/babel-preset'],
    plugins: [
      [
        './src/config/env/index.js',
        {
          moduleName: '@env',
          path: envPath,
        },
      ],
      [
        'module-resolver',
        {
          root: ['./src'],
          extensions: ['.js', '.json', '.tsx', '.ts'],
          alias: {
            '@': './src',
          },
        },
      ],
      ...(api.env() !== 'development' ? ['transform-remove-console'] : []),
      'react-native-reanimated/plugin',
    ],
  };
};
