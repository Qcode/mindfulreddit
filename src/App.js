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
                post.comments = data[1].data.children
                  .filter(comment => !comment.data.stickied)
                  .slice(0, 3)
                  .map(comment => comment.data);
              });

            commentPromises.push(promise);
          });
        });

        Promise.all(commentPromises).then(() => {
          this.setState({
            subredditData: topPostsFromSubreddits,
            chooseSubreddits: false,
          });
          // 1.08e7 = 3 hours in milliseconds
          localStorage.setItem('timeUntilNextFetch', Date.now() + 1.08e7);
          localStorage.setItem(
            'lastData',
            JSON.stringify(topPostsFromSubreddits),
          );
        });
      })
      .catch(err => console.log(err));
  }

  render() {
    const timeLeft =
      parseInt(localStorage.getItem('timeUntilNextFetch'), 10) - Date.now();

    const hours = Math.floor(
      (timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
    );
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));

    return (
      <div className="App">
        <h1>consciousreddit.com</h1>
        {this.state.chooseSubreddits ? (
          <SubredditForm fetchContent={this.handleSubredditRequests} />
        ) : (
          <RetrievedPosts data={this.state.subredditData} />
        )}
        <p>
          Your will get more redidt time in {hours} hours, {minutes} minutes
        </p>
      </div>
    );
  }
}

export default App;
