import React, { Component } from 'react';

class SubredditForm extends Component {
  constructor(props) {
    super(props);

    this.state = { subreddits: [] };

    this.handleInput = this.handleInput.bind(this);
  }

  handleInput(event, index) {
    const newSubreddits = this.state.subreddits.slice();
    newSubreddits[index] = event.target.value;
    this.setState({ subreddits: newSubreddits });
  }

  render() {
    return (
      <div>
        {[...Array(3)].map((item, index) => (
          <div>
            <label>/r/</label>
            <input
              onChange={event => this.handleInput(event, index)}
              type="text"
            />
          </div>
        ))}
        <input
          type="submit"
          onClick={() => this.props.fetchContent(this.state.subreddits)}
        />
      </div>
    );
  }
}

export default SubredditForm;
