// dependencies
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
// components
import Header from './components/Header';
import Footer from './components/Footer';
// pages
import Home from './pages/Home';
import Login from './pages/Login';
import NoMatch from './pages/NoMatch';
import SingleThought from './pages/SingleThought';
import Profile from './pages/Profile';
import Signup from './pages/Signup';
// establish link to GraphQL server with specified endpoint
const httpLink = createHttpLink({
  // uri stands for 'uniform resource identifier'
  uri: '/graphql',
});

// create a new instance of Apollo Client and connection to it
const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

function App() {
  return (
    // The parent container this time is the Apollo Provider that we've just created above
    <ApolloProvider client={client}>
      {/* Routes and Route make the children elements aware of the routing that can take place */}
      <Router>
        <div className="flex-column justify-flex-start min-100-vh">
          <Header/>
          <div className="container">
            <Routes>
              <Route path="/" element={<Home/>}/>
              <Route path="/login" element={<Login/>}/>
              <Route path="/signup" element={<Signup/>}/>
              {/* check for username in params. If no username, render Profile without params */}
              <Route path="/profile" element={<Profile/>}/>
              <Route path="/thought/:id" element={<SingleThought/>}/>
              <Route path="*" element={<NoMatch/>}/>
            </Routes>
          </div>
          <Footer/>
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;