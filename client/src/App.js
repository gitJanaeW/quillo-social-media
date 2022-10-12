// dependecies
import React from 'react';
import { ApolloProvider, ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
// components
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';

// establish link to GraphQL server with specified endpoint
const httpLink = createHttpLink({
  uri: 'http://localhost:3001/graphql',
});
// create a new instance of Apollo Client and connection to it
const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache()
});

function App() {
  return (
    // The parent container this time is the Apollo Provider that we've just created above
    <ApolloProvider client={client}>
      <div className='flex-column justify-flex-start min-100-vh'>
        <Header/>
        <div className='container'>
          <Home/>
        </div>
        <Footer/>
      </div>
    </ApolloProvider>
  );
}

export default App;
