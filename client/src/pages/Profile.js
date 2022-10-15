import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import Auth from '../utils/auth';
import ThoughtList from '../components/ThoughtList';
import FriendList from '../components/FriendList';
import {QUERY_USER, QUERY_ME} from '../utils/queries';
import {ADD_FRIEND} from '../utils/mutations';
import ThoughtForm from '../components/ThoughtForm';

const Profile = (props) => {
  const [addFriend] = useMutation(ADD_FRIEND);
  const handleAddFriend = async () => {
    try {
      await addFriend({
        variables: {id: user._id}
      });
    } catch (e) {
      console.log(e);
    }
  }
  // useParams will grab the parameters from the URL, making the username property = the params
  const { username: userParam } = useParams();
  // if there's a param in the url, use that to run query. Else, query me for personal profile info
  const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
    variables: { username: userParam },
  });
  // use an empty object to display nothing until query data for user returns
  const user = data?.me || data?.user || {};
  // navigate to personal profile if username is the logged-in user's ursename
  if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
    // Navigate redirects the user away from '/profile/<username>' to the logged in version of their page: '/profile'
    return <Navigate to="/profile"/>
  }
  // if we're waiting on data...
  if (loading) {
    return <div>Loading...</div>;
  }
  // or if we navigate to Profile and we're not logged in
  if (!user?.username) {
    return (
      <h4>
        You need to be logged in to see this page.
      </h4>
    )
  } 
  // else
  return (
    <div>
      <div className="flex-row mb-3">
        <h2 className="bg-dark text-secondary p-3 display-inline-block">
          Viewing {userParam ? `${user.username}'s` : 'your'} profile.
        </h2>
        {userParam && (
          <button className='btn ml-auto' onClick={handleAddFriend}>Add Friend</button>
        )}
        
      </div>

      <div className="flex-row justify-space-between mb-3">
        <div className="col-12 mb-3 col-lg-8">
          <ThoughtList
            thoughts={user.thoughts}
            title={`${user.username}'s thoughts...`}
          />
        </div>

        <div className="col-12 col-lg-3 mb-3">
          <FriendList
            username={user.username}
            friendCount={user.friendCount}
            friends={user.friends}
          />
        </div>
      </div>
      <div className='mb-3'>{!userParam && <ThoughtForm/>}</div>
    </div>
  );
};

export default Profile;