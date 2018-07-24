import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PostDetail from './PostDetail';

class RetrievedPosts extends Component {
  componentDidMount() {
    this.props.ReactGA.pageview('Subreddit View');
  }

  render() {
    const generateKey = posts => posts.reduce((acc, cur) => acc + cur.id, '');
    return (
      <div>
        {this.props.data.map(subredditPosts => (
          <div key={generateKey(subredditPosts)}>
            <h1>
              <span className="red">/r/</span>
              {subredditPosts[0].subreddit}
            </h1>
            {subredditPosts.map(post => (
              <PostDetail key={post.id} post={post} />
            ))}
          </div>
        ))}
        <p>{this.props.timeLeft}</p>
      </div>
    );
  }
}

RetrievedPosts.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.arrayOf(PropTypes.shape({ id: PropTypes.string })),
  ),
  timeLeft: PropTypes.string,
  ReactGA: PropTypes.shape({ pageview: PropTypes.func }).isRequired,
};

export default RetrievedPosts;
