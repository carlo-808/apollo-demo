'use strict'
require('newrelic')

const { ApolloServer, gql } = require('apollo-server')
const plugin = require('@newrelic/apollo-server-plugin')
const { getTypeDefs, resolvers } = require('./data-definitions')

const server = new ApolloServer({
  typeDefs: getTypeDefs(gql),
  resolvers,
  plugins: [
    plugin
  ]
 })

server.listen().then(({url}) => {
  console.log(`🚀 Apollo GraphQL server ready at ${url}`)
})
