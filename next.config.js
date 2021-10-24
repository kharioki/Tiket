module.exports = {
  webpack5: false,
  webpack: (config) => {
    config.node = {
      dns: "mock",
      fs: "empty",
      path: true,
      url: false,
      net: "empty",
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