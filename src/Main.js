import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import SubredditForm from './SubredditForm';
import RetrievedPosts from './RetrievedPosts';

class Main extends Component {
  constructor(props) {
    super(props);

    this.updateTime = this.updateTime.bind(this);
    this.handleSubredditRequests = this.handleSubredditRequests.bind(this);

    this.state = {
      chooseSubreddits: true,
      subredditData: [],
      error: null,
      currentTime: Date.now(),
      loading: false,
      timeIntervalId: setInterval(this.updateTime, 1000),
    };

    if (parseInt(localStorage.getItem('timeUntilNextFetch'), 10) > Date.now()) {
      this.state.chooseSubreddits = false;
      this.state.subredditData = JSON.parse(localStorage.getItem('lastData'));
    }
  }

  componentDidMount() {
    this.props.ReactGA.pageview('Main Page');
  }

  componentWillUnmount() {
    clearInterval(this.state.timeIntervalId);
  }

  handleSubredditRequests(subreddits) {
    const subredditPromises = subreddits.map(reddit =>
      fetch('https://www.reddit.com/r/' + reddit + '.json'),
    );

    this.setState({ loading: true });

    Promise.all(subredditPromises)
      .then(data => Promise.all(data.map(response => response.json())))
      .then(data =>
        data.map(subreddit =>
          subreddit.data.children
            .map(post => post.data)
            .filter(post => !post.stickied)
            .slice(0, 3),
        ),
      )
      .then(data => {
        data.forEach((subredditPosts, index) => {
          if (subredditPosts.length === 0) {
            throw new Error(`No posts in ${subredditPosts[index]}`);
          }
        });
        return data;
      })
      .then(data => {
        const commentPromises = [];
        data.forEach((subredditPosts, index) => {
          subredditPosts.forEach(post => {
            // This is for things such as /r/all, where the subreddit you entered
            // doesn't necessarily match the name in the request
            post.subreddit = subreddits[index];
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
        return Promise.all([data, ...commentPromises]);
      })
      .then(data => {
        this.setState({
          subredditData: data[0],
          chooseSubreddits: false,
          loading: false,
          error: null,
        });
        // 1.08e7 = 3 hours in milliseconds
        localStorage.setItem('timeUntilNextFetch', Date.now() + 1.08e7);
        localStorage.setItem('lastData', JSON.stringify(data[0]));
      })
      .catch(() => {
        this.setState({
          loading: false,
          error:
            'Error fetching posts; please check the spelling of your subreddits',
        });
      });
  }

  updateTime() {
    this.setState({
      currentTime: Date.now(),
    });
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

    if (minutes !== 0 && hours !== 0) {
      hoursStatement += ' and';
    }

    let minutesStatement = ` ${minutes} minutes`;

    if (minutes === 1) {
      minutesStatement = ` ${minutes} minute`;
    } else if (minutes === 0) {
      minutesStatement = '';
    }

    if (minutes === 0 && hours === 0) {
      return (
        'You may view more posts in ' + Math.floor(timeLeft / 1000) + ' seconds'
      );
    }

    return 'You may view more posts in' + hoursStatement + minutesStatement;
  }

  render() {
    return (
      <div>
        {this.state.chooseSubreddits ? (
          <SubredditForm
            error={this.state.error}
            loading={this.state.loading}
            fetchContent={this.handleSubredditRequests}
          />
        ) : (
          <RetrievedPosts
            timeLeft={this.getTimeLeft()}
            data={this.state.subredditData}
            ReactGA={this.props.ReactGA}
          />
        )}
        <footer>
          <NavLink className="" to="/about">
            <p>About this Site</p>
          </NavLink>
        </footer>
      </div>
    );
  }
}

Main.propTypes = {
  ReactGA: PropTypes.shape({ pageview: PropTypes.func }).isRequired,
};

export default Main;
