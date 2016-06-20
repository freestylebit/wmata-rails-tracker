const React = require('react');
const _ = require('lodash');
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
    data: React.PropTypes.object
  },
  getInitialState: function() {
    return {
      secondsElapsed: 0,
      data: {}
    };
  },
  tick: function() {
    this.setState({
      secondsElapsed: this.state.secondsElapsed + 1
    });
  },
  componentDidMount: function() {
    this.interval = setInterval(this.tick, 1000);
    const url = `/v1/data/track/YL`;
    setInterval(() => {
      $.ajax({
        url: url, success: function(result) {
          this.setState({
            data: result
          });
        }.bind(this)
      });
    }, 2000);
  },
  componentWillUnmount: function() {
    clearInterval(this.interval);
  },
  render: function() {
    let content = _.map(this.state.data, (data) => {
      return (<Row label={data.name} flag={data.status} />);
    });

    return (
      <div>
        <p>Seconds Elapsed: {this.state.secondsElapsed}</p>
        {content}
      </div>
    );
  }
});

module.exports = Track;
