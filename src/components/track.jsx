const React = require('react');

const Track = React.createClass({
  propTypes: {
    title: React.PropTypes.string,
    number: React.PropTypes.number,
  },
  getInitialState: function() {
    return {
      secondsElapsed: 1
    };
  },
  tick: function() {
    this.setState({secondsElapsed: this.state.secondsElapsed + 1});
  },
  componentDidMount: function() {
    this.interval = setInterval(this.tick, 1000);
  },
  componentWillUnmount: function() {
    clearInterval(this.interval);
  },
  render: function() {
    return (
      <div>
        <p>Seconds Elapsed: {this.state.secondsElapsed}</p>
      </div>
    );
  }
});

module.exports = Track;
