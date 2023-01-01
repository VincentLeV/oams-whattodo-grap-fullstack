import {
    ApolloClient,
    InMemoryCache,
    HttpLink
} from "@apollo/client"

// const URI = process.env.REACT_APP_BACKEND_BASE_URL || "https://oams-whattodo-grap-backend.onrender.com/graphql" 
const URI = process.env.REACT_APP_BACKEND_BASE_URL || "https://oams-whattodo-grap-fullstack-production.up.railway.app/graphql" 

const httpLink = new HttpLink({ 
    uri: URI
})

export const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: httpLink
})
