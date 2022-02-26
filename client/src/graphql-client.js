import {
    ApolloClient,
    InMemoryCache,
    HttpLink,
    ApolloLink
} from "@apollo/client"

// const URI = process.env.REACT_APP_BACKEND_BASE_URL || "https://oams-whattodo-grap.herokuapp.com/graphql" 
const URI = "https://oams-whattodo-grap.herokuapp.com/graphql" 

const operationNameLink = new ApolloLink((operation, forward) => {
    operation.setContext(({ headers }) => ({
        headers: {
            "x-gql-operation-name": operation.operationName,
            ...headers,
        },
    }))

    return forward(operation)
})

const httpLink = new HttpLink({ 
    uri: URI
})

export const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: operationNameLink.concat(httpLink)
})

if (window.Cypress) {
    window.graphqlClient = client
}
