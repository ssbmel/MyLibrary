const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app){

  app.use(
      createProxyMiddleware( '/naver-api', {
          target: 'https://openapi.naver.com',
          changeOrigin: true,
          pathRewrite:{
            '^/naver-api/':'/'
          }
      })
  )
};