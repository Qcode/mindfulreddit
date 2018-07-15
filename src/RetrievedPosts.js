import React from 'react';
import PostDetail from './PostDetail';

function RetrievedPosts(props) {
  return props.data.map(subredditPosts => (
    <div>
      <h1>/r/{subredditPosts[0].subreddit}</h1>
      {subredditPosts.map(post => <PostDetail post={post} />)}
    </div>
  ));
}

export default RetrievedPosts;
