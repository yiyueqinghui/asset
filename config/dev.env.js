'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  // API_ROOT:'"http://10.20.45.62:10172"'
  API_ROOT:'"http://localhost:8080/fake-api"'
  // API_ROOT:'""'
})
