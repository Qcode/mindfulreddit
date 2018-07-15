import React, { Component } from 'react';
import SubredditForm from './SubredditForm';
import RetrievedPosts from './RetrievedPosts';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { chooseSubreddits: true, subredditData: [], error: null };
    this.handleSubredditRequests = this.handleSubredditRequests.bind(this);
  }

  handleSubredditRequests(subreddits) {
    const subredditPromises = subreddits.map(reddit =>
      fetch('https://www.reddit.com/r/' + reddit + '.json'),
    );

    Promise.all(subredditPromises)
      .then(data => Promise.all(data.map(response => response.json())))
      .then(data => {
        const topPostsFromSubreddits = data.map(subreddit =>
          subreddit.data.children
            .map(post => post.data)
            .filter(post => !post.stickied)
            .slice(0, 3),
        );

        const commentPromises = [];

        topPostsFromSubreddits.forEach(subredditPosts => {
          subredditPosts.forEach(post => {
            const promise = fetch(
              'https://www.reddit.com' +
                post.permalink +
                '.json?sort=confidence',
            )
              .then(data => data.json())
              .then(data => {
                post.comments = data[1].data.children;
              });

            commentPromises.push(promise);
          });
        });

        Promise.all(commentPromises).then(() => {
          this.setState({
            subredditData: topPostsFromSubreddits,
            chooseSubreddits: false,
          });
        });
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <div className="App">
        <h1>consciousreddit.com</h1>
        {this.state.chooseSubreddits ? (
          <SubredditForm fetchContent={this.handleSubredditRequests} />
        ) : (
          <RetrievedPosts data={this.state.subredditData} />
        )}
      </div>
    );
  }
}

export default App;
