import React from 'react';
import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown';
import './Comment.css';

function Comment(props) {
  const commentClass = props.lastComment ? 'comment-last' : 'comment';
  return (
    <div className={commentClass}>
      <p className="comment-author">{props.comment.author}</p>
      <ReactMarkdown source={props.comment.body} />
    </div>
  );
}

Comment.propTypes = {
  lastComment: PropTypes.bool,
  comment: PropTypes.shape({
    author: PropTypes.string,
    body: PropTypes.string,
  }),
};

export default Comment;
