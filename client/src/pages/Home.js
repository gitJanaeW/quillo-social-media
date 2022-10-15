import React from 'react';
import ThoughtList from '../components/ThoughtList';

import { useQuery } from '@apollo/client';
import { QUERY_THOUGHTS } from '../utils/queries';

const Home = () => {
  // use useQuery hook to make query request
  // loading: an async feature provided by Apollo to indicate that the req is not yet complete
  // data: the response with the data requested in the query
  const { loading, data } = useQuery(QUERY_THOUGHTS);
  // this 'optional chaining' syntax, is saying 'if data exists, store it in the thoughts const. else, create an empty arr'
  // the empty arr is a fallback. since the async useQuery() won't get all the data right away, we have a failsafe
  const thoughts = data?.thoughts || [];

  return (
    <main>
      <div className="flex-row justify-space-between">
        <div className="col-12 mb-3">
          {loading ? (<div>Loading...</div>) : (
            <ThoughtList thoughts={thoughts} title="Some Feed for Thought..."/>
          )}
        </div>
      </div>
    </main>
  );
};

export default Home;