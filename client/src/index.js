import ReactDOM from "react-dom"
import App from "./App"

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
  split
} from "@apollo/client"
import { setContext } from "@apollo/client/link/context"
import { getMainDefinition } from "@apollo/client/utilities"
// import { createHttpLink } from 'apollo-link-http'
// import { WebSocketLink } from "@apollo/client/link/ws"

const httpLink = new HttpLink({ uri: "https://oams-whattodo-grap.herokuapp.com/graphql" })
// const httpLink = createHttpLink({ uri: "http://localhost:5000/graphql" })

// const wsLink = new WebSocketLink({
//   uri: "wss://oams-whattodo-perg.herokuapp.com/graphql",
//   options: {
//     reconnect: true
//   }
// })

// const splitLink = split(({ query }) => {
//   const definition = getMainDefinition(query)
//   return (
//     definition.kind === "OperationDefinition" &&
//     definition.operation === "subscription"
//   )
// }, 
//   wsLink, 
//   authLink.concat(httpLink)
// )

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: httpLink
})

ReactDOM.render(
  <ApolloProvider client={client}>
    <App /> 
  </ApolloProvider>,
  document.getElementById("root")
)
