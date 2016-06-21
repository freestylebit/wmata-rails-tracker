const React = require('react');
const _ = require('lodash');
const $ = require('jquery');

// Include stylesheet for the component.
require('./track.scss');

// Single entry for each station.
const Row = React.createClass({
  render: function() {
    return (
      <div className="track__entry">
        <div className="track__entry__flag">
          <i className={`fa ${this.props.flag}`} aria-hidden="true"></i>
        </div>
        <div className="track__entry__label">
          {this.props.label}
        </div>
      </div>
    );
  }
});

// Full timetables.
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
    this.getData();
    setInterval(() => {
      this.getData();
    }, 5000);
  },
  componentWillUnmount: function() {
    clearInterval(this.interval);
  },
  getData: function() {
    const url = `/v1/data/track/${window.line_code}`;
    $.ajax({
      url: url, success: function(result) {
        this.setState({
          data: result
        });
      }.bind(this)
    });
  },
  render: function() {
    let content = _.map(this.state.data, (data) => {
      // Convert statuses to font-awesome flags
      let status;
      switch (data.status) {
        case 'incoming':
          status = 'fa-train GREY';
          break;
        case 'boarding':
          status = 'fa-train';
          break;
        default:
          // No status needed.
          break;
      }
      return (<Row label={data.name} flag={status} key={data.name} />);
    });

    return (
      <div className="track">
        {content}
      </div>
    );
  }
});

module.exports = Track;
