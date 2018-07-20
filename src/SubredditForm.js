import React, { Component } from 'react';
import Input from '@material-ui/core/Input';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
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
      <form onSubmit={this.onSubmit}>
        <p>Select three subreddits to see posts from.</p>
        {[...Array(3)].map((item, index) => (
          <div className="subreddit-input">
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
            fullWidth
          >
            See Posts
          </Button>
        </div>
      </form>
    );
  }
}

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
