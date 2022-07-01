const { join } = require('path');
const withPWA = require('next-pwa');
const runtimeCaching = require('next-pwa/cache');

module.exports = withPWA({
  pwa: {
    disable: process.env.NODE_ENV === 'development',
    runtimeCaching,
    dest: 'public',
    sourcemap: true,
  },
  productionBrowserSourceMaps: true,
  sassOptions: {
    includePaths: [
      join(__dirname, 'src/styles'),
      join(__dirname, 'src/styles/variables'),
      join(__dirname, 'src/styles/mixins'),
      join(__dirname, 'src/styles/keyframes'),
      join(__dirname, 'src/styles/global'),
      join(__dirname, 'src/styles/configs')
    ],
  },
});
