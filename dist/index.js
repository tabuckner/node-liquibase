
'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./node-liquibase.cjs.production.min.js')
} else {
  module.exports = require('./node-liquibase.cjs.development.js')
}
