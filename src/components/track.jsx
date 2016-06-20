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
    code: React.PropTypes.string,
    data: React.PropTypes.object
  },
  getInitialState: function() {
    return {
      code: 'YL',
      data: {}
    };
  },
  componentDidMount: function() {
    const url = `/v1/data/track/${window.line_code}`;
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
      <div className="track">
        {content}
      </div>
    );
  }
});

module.exports = Track;
