import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Input from '@material-ui/core/Input';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import ReactLoading from 'react-loading';
import './SubredditForm.css';

class SubredditForm extends Component {
  constructor(props) {
    super(props);

    this.state = { subreddits: [] };

    this.handleInput = this.handleInput.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  handleInput(event, index) {
    const newSubreddits = this.state.subreddits.slice();
    newSubreddits[index] = event.target.value;
    this.setState({ subreddits: newSubreddits });
  }

  onSubmit(e) {
    e.preventDefault();
    this.props.fetchContent(this.state.subreddits);
  }

  render() {
    const { classes } = this.props;

    return (
      <form className="subreddit-form" onSubmit={this.onSubmit}>
        <p>Select three subreddits to see posts from.</p>
        {[...Array(3)].map((item, index) => (
          <div key={index} className="subreddit-input">
            <label className="subreddit-form-label">/r/</label>
            <Input
              inputProps={{
                spellCheck: false,
                required: true,
              }}
              onChange={event => this.handleInput(event, index)}
              classes={{ root: classes.root, underline: classes.underline }}
            />
          </div>
        ))}
        <div className="subreddit-form-button-container">
          <Button
            type="submit"
            variant="outlined"
            color="primary"
            className={classes.button}
          >
            See Posts
          </Button>
        </div>
        {this.props.loading && (
          <ReactLoading
            className="subreddit-form-loading"
            type="bubbles"
            color="#ff4500"
          />
        )}
        {this.props.error && <p>{this.props.error}</p>}
      </form>
    );
  }
}

SubredditForm.propTypes = {
  fetchContent: PropTypes.func.isRequired,
  classes: PropTypes.shape({
    root: PropTypes.string,
    underline: PropTypes.string,
  }),
  loading: PropTypes.bool,
  error: PropTypes.string,
};

const styles = {
  root: {
    fontFamily: 'Josefin Sans',
  },
  underline: {
    '&:after': {
      borderBottom: '2px solid #ff4500',
    },
  },
};

export default withStyles(styles)(SubredditForm);
