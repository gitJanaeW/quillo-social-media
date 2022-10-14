// dependecies
import React from 'react';
import { ApolloProvider, ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
// components
import Header from './components/Header';
import Footer from './components/Footer';
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
  cache: new InMemoryCache()
});

function App() {
  return (
    // The parent container this time is the Apollo Provider that we've just created above
    <ApolloProvider client={client}>
      <Router>
        <div className="flex-column justify-flex-start min-100-vh">
          <Header />
          <div className="container">
            {/* Routes and Route make the children elements aware of the routing that can take place */}
            <Routes>
              <Route path="/" element={<Home/>}/>
              <Route path="/login" element={<Login/>}/>
              <Route path="/signup" element={<Signup/>}/>
              <Route path="/profile">
                {/* check for username in params. If no username, render Profile without params */}
                <Route path=":username" element={<Profile/>}/>
                <Route path='' element={<Profile/>}/>
              </Route>
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
