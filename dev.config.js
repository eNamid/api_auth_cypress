module.exports = {
  apps : [
      {
      name: "api-auth",
      script: "service.js",
      watch: true,
      ignore_watch: ['node_modules'],
      env: {
        NODE_ENV: "development",
        PORT: 8080,
        MONGO_USER: 'user',
        MONGO_PASS: 'user',
        MONGO_DB: 'api-auth',
        MONGO_HOST: '178.251.107.53/32'
      }
    }
  ]
}
  