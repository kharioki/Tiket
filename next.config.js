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
