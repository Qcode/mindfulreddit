import React from 'react';
import ReactMarkdown from 'react-markdown';
import Comment from './Comment';

function PostDetail(props) {
  const comments = props.post.comments
    .filter(comment => !comment.data.stickied)
    .slice(0, 3)
    .map(comment => comment.data);

  console.log(comments);

  const title = <h2>{props.post.title}</h2>;
  return (
    <div>
      {props.post.is_self ? title : <a href={props.post.url}>{title}</a>}
      {props.post.is_self && <ReactMarkdown source={props.post.selftext} />}
      {comments.map(comment => <Comment comment={comment} />)}
    </div>
  );
}

export default PostDetail;
