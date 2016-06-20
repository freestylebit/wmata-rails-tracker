const React = require('react');
const $ = require('jquery');

const Row = React.createClass({
  render: function() {
    return (
      <div class="track__entry">
        <div class="track__entry__label">
          {this.props.label}
        </div>
        <div class="track__entry__flag">
          {this.props.flag}
        </div>
      </div>
    );
  }
});

const Track = React.createClass({
  propTypes: {
    secondsElapsed: React.PropTypes.number,
  },
  getInitialState: function() {
    return {
      secondsElapsed: 1
    };
  },
  tick: function() {
    this.setState({
      secondsElapsed: this.state.secondsElapsed + 1}
    );
  },
  componentDidMount: function() {
    this.interval = setInterval(this.tick, 1000);
    const url = `/v1/data/track/YL`;
    $.ajax({url: url, success: function(result){
      console.log(result);
    }});
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
