module.exports = {
  devServer: {
    proxy: process.env.MONEROD_HOSTNAME
  }
}