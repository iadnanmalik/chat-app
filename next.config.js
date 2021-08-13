// module.exports = {
//   reactStrictMode: true,
// }
module.exports = {
  async rewrites() {
      return [
        {
          source: '/api/:path*',
          destination: 'https://betatech-chat.herokuapp.com/:path*',
        },
      ]
    },
};