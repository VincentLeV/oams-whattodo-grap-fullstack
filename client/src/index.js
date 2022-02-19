import ReactDOM from "react-dom"
import App from "./App"

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink
} from "@apollo/client"

// const httpLink = new HttpLink({ uri: "https://oams-whattodo-grap.herokuapp.com/graphql" })
const httpLink = new HttpLink({ uri: "http://localhost:5000/graphql" })

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
