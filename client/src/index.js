import ReactDOM from "react-dom"
import App from "./App"

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink
} from "@apollo/client"

// const URI = process.env.REACT_APP_BACKEND_BASE_URL || "https://oams-whattodo-grap.herokuapp.com/graphql" 
const URI = "https://oams-whattodo-grap.herokuapp.com/graphql" 

const httpLink = new HttpLink({ 
  uri: URI
})

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
