module.exports = {
  development: {
    port: process.env.PORT || 8086,
    ip: '0.0.0.0',
  },
  production: {
    port: process.env.PORT,
    ip: '0.0.0.0',
  }
};
