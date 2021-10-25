const isProd = process.env.NODE_ENV === 'production'

module.exports = {
  assetPrefix: isProd ? '/tiket/' : '',
  webpack5: false,
  webpack: (config) => {
    config.node = {
      dns: "mock",
      fs: "empty",
      path: true,
      url: false,
      net: "empty",
      electron: "empty",
    };
    return config;
  },
};

// module.exports = {
//   webpack: (config) => {
//     config.resolve.fallback = {
//       ...config.resolve.fallback,
//       fs: false,
//       net: false,
//       child_process: false,
//       readline: false,
//     };
//     return config;
//   },
// };