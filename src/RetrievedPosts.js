import React from 'react';
import PostDetail from './PostDetail';

function RetrievedPosts(props) {
  const generateKey = posts => posts.reduce((acc, cur) => acc + cur.id, '');
  return props.data.map(subredditPosts => (
    <div key={generateKey(subredditPosts)}>
      <h1>
        <span className="red">/r/</span>
        {subredditPosts[0].subreddit}
      </h1>
      {subredditPosts.map(post => <PostDetail key={post.id} post={post} />)}
      <p>{props.timeLeft}</p>
    </div>
  ));
}

export default RetrievedPosts;
