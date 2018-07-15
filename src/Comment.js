import React from 'react';
import ReactMarkdown from 'react-markdown';

function Comment(props) {
  return <ReactMarkdown source={props.comment.body} />;
}

export default Comment;
