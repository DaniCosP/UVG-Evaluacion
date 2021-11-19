const { ApolloServer, gql } = require('apollo-server');

const typeDefs = require('./schema');
const resolvers = require('./resolvers');
const { CreateMysqlSource } = require('./utils');

const MysqlSource = require('./datasources/mysql');

const source = CreateMysqlSource();

const dataSources = () => ({
    MysqlSource: new MysqlSource({ source })
  });

const server = new ApolloServer({
    typeDefs,
    resolvers,
    dataSources,
    introspection: true,
  });


server.listen().then(({ url }) => {
    console.log(`Server corriendo en ${url}`);
});

module.exports = {
    dataSources,
    typeDefs,
    resolvers,
    ApolloServer,
    MysqlSource,
    source,
    server,
  };