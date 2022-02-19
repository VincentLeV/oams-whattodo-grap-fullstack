const { ApolloServer } = require("apollo-server-express")

const schema = require("./schema")

const apolloServer = new ApolloServer({
	schema,
	// introspection: true,
	// playground: true
})

module.exports = apolloServer