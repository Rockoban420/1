import './App.css';
import { TodoApp } from './components/TodoApp';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';

import { ApolloLink } from 'apollo-link';
import { onError } from '@apollo/client/link/error';

const httpLink = createHttpLink({
  uri: '/graphql',
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
    );
  if (networkError) console.log(`[Network error]: ${networkError}`);
});

const client = new ApolloClient({
  link: ApolloLink.from([errorLink, httpLink]),
  cache: new InMemoryCache(),
});


function App() {
  return (
    <div className="App">
      <ApolloProvider client={client}>
      <TodoApp/>
      </ApolloProvider>
    </div>
  );
}

export default App;
