import React from 'react';
import PostDetail from './PostDetail';

function RetrievedPosts(props) {
  return props.data.map(subredditPosts => (
    <div>
      <h1>
        <span class="red">/r/</span>
        {subredditPosts[0].subreddit}
      </h1>
      {subredditPosts.map(post => <PostDetail post={post} />)}
      <p>{props.timeLeft}</p>
    </div>
  ));
}

export default RetrievedPosts;
