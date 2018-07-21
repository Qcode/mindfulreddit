import React from 'react';
import ReactMarkdown from 'react-markdown';
import PropTypes from 'prop-types';
import './PostDetail.css';
import Comment from './Comment';

function PostDetail(props) {
  const comments = props.post.comments;

  const postClassName =
    comments.length > 0 ? 'post-details' : 'post-details post-no-comments';

  const title = <h2>{props.post.title}</h2>;
  return (
    <div className="post-container">
      <div className={postClassName}>
        {props.post.is_self ? title : <a href={props.post.url}>{title}</a>}
        <p className="post-author">{props.post.author}</p>
        {props.post.is_self && <ReactMarkdown source={props.post.selftext} />}
      </div>
      {comments.map((comment, index) => (
        <Comment
          key={comment.id}
          lastComment={index === comments.length - 1}
          comment={comment}
        />
      ))}
    </div>
  );
}

PostDetail.propTypes = {
  post: PropTypes.shape({
    comments: PropTypes.arrayOf(
      PropTypes.shape({ author: PropTypes.string, body: PropTypes.string }),
    ),
    title: PropTypes.string,
    is_self: PropTypes.bool,
    url: PropTypes.string,
    author: PropTypes.string,
    selftext: PropTypes.string,
  }),
};

export default PostDetail;
