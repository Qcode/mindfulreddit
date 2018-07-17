import React, { Component } from 'react';
import SubredditForm from './SubredditForm';
import RetrievedPosts from './RetrievedPosts';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chooseSubreddits: true,
      subredditData: [],
      error: null,
      currentTime: Date.now(),
    };

    this.handleSubredditRequests = this.handleSubredditRequests.bind(this);

    if (parseInt(localStorage.getItem('timeUntilNextFetch'), 10) > Date.now()) {
      this.state.chooseSubreddits = false;
      this.state.subredditData = JSON.parse(localStorage.getItem('lastData'));
    }

    this.updateTime = this.updateTime.bind(this);

    setInterval(this.updateTime, 10000);
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

  getTimeLeft() {
    const hoursFromNow = localStorage.getItem('timeUntilNextFetch');
    const endTime = hoursFromNow
      ? parseInt(hoursFromNow, 10)
      : Date.now() + 1.08e7;
    const timeLeft = endTime - this.state.currentTime;

    if (timeLeft <= 0) {
      return 'You may view more posts now. Refresh the page to do so.';
    }

    const hours = Math.floor(
      (timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
    );
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));

    let hoursStatement = ` ${hours} hours`;

    if (hours === 1) {
      hoursStatement = ` ${hours} hour`;
    } else if (hours === 0) {
      hoursStatement = '';
    }

    if (minutes !== 0) {
      hoursStatement += ' and';
    }

    let minutesStatement = ` ${minutes} minutes`;

    if (minutes === 1) {
      minutesStatement = ` ${minutes} minute`;
    } else if (minutes === 0) {
      minutesStatement = '';
    }

    return 'You may view more posts in' + hoursStatement + minutesStatement;
  }

  updateTime() {
    this.setState({ currentTime: Date.now() });
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
        {!this.state.chooseSubreddits && <p>{this.getTimeLeft()}</p>}
      </div>
    );
  }
}

export default App;
