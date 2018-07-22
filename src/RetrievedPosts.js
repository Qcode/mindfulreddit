import React from 'react';
import PropTypes from 'prop-types';
import PostDetail from './PostDetail';

function RetrievedPosts(props) {
  const generateKey = posts => posts.reduce((acc, cur) => acc + cur.id, '');
  return (
    <div>
      {props.data.map(subredditPosts => (
        <div key={generateKey(subredditPosts)}>
          <h1>
            <span className="red">/r/</span>
            {subredditPosts[0].subreddit}
          </h1>
          {subredditPosts.map(post => <PostDetail key={post.id} post={post} />)}
        </div>
      ))}
      <p>{props.timeLeft}</p>
    </div>
  );
}

RetrievedPosts.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.arrayOf(PropTypes.shape({ id: PropTypes.string })),
  ),
  timeLeft: PropTypes.string,
};

export default RetrievedPosts;
