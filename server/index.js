const express = require("express")
const { config } = require("./utils")
const apolloServer = require("./graphql")

const startApp = async () => {
    try {
        await apolloServer.start()
        const app = express()
        apolloServer.applyMiddleware({ app })

        app.get("*", (req, res) => {
            res.send(`Server running at http://localhost:${config.PORT}${apolloServer.graphqlPath}`)
        })

        app.listen({ port: config.PORT }, () => console.log(`Server running at http://localhost:${config.PORT}${apolloServer.graphqlPath}`))

        return { apolloServer, app }
    } catch (err) {
        console.log(err)
        console.log("Not able to run GraphQL server")
    }
}

startApp()