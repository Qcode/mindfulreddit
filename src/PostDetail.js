import React from 'react';
import ReactMarkdown from 'react-markdown';
import './PostDetail.css';
import Comment from './Comment';

function PostDetail(props) {
  const comments = props.post.comments;

  const title = <h2>{props.post.title}</h2>;
  return (
    <div className="post-container">
      <div className="post-details">
        {props.post.is_self ? title : <a href={props.post.url}>{title}</a>}
        <p className="post-author">{props.post.author}</p>
        {props.post.is_self && <ReactMarkdown source={props.post.selftext} />}
      </div>
      {comments.map((comment, index) => (
        <Comment
          lastComment={index === comments.length - 1}
          comment={comment}
        />
      ))}
    </div>
  );
}

export default PostDetail;
