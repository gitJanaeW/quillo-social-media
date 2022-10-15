import React from 'react';
import { useQuery } from '@apollo/client';
import ThoughtList from '../components/ThoughtList';
import { QUERY_THOUGHTS, QUERY_ME_BASIC } from '../utils/queries';
import Auth from '../utils/auth';
import FriendList from '../components/FriendList';

const Home = () => {
  // use useQuery hook to make query request
  // loading: an async feature provided by Apollo to indicate that the req is not yet complete
  // data: the response with the data requested in the query
  const { loading, data } = useQuery(QUERY_THOUGHTS);
  // destructure to extract `data` from the `useQuery` and rename it `userData` to be more descriptive
  const {data: userData} = useQuery(QUERY_ME_BASIC);
  // this 'optional chaining' syntax, is saying 'if data exists, store it in the thoughts const. else, create an empty arr'
  // the empty arr is a fallback. since the async useQuery() won't get all the data right away, we have a failsafe
  const thoughts = data?.thoughts || [];
  const loggedIn = Auth.loggedIn();
  return (
    <main>
      <div className="flex-row justify-space-between">
        <div className={`col-12 mb-3 ${loggedIn && 'col-lg-8'}`}>
          {loading ? (<div>Loading...</div>) : (
            <ThoughtList thoughts={thoughts} title="Some Feed for Thought..."/>
          )}

          {loggedIn && userData ? (
            <div className="col-12 col-lg-3 mb-3">
              <FriendList
                username={userData.me.username}
                friendCount={userData.me.friendCount}
                friends={userData.me.friends}
              />
            </div>
          ) : null}
        </div>
      </div>
    </main>
  );
};

export default Home;