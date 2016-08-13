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
        <div className={`track__entry__flag ${this.props.direction}`}>
          <i className={`fa ${this.props.flag}`} aria-hidden="true" />
          <i className={`fa fa-arrow-${this.props.direction}`} aria-hidden="true" />
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
      url: url,
      success: function(result) {
        this.setState({
          data: result
        });
      }.bind(this)
    });
  },
  render: function() {
    let content = _.map(this.state.data, (data) => {
      // Convert statuses to font-awesome flags to dictate a train is at
      // the station.
      let status;
      switch (data.status) {
        case 'incoming':
          status = 'fa-train approaching';
          break;
        case 'boarding':
          status = 'fa-train';
          break;
        default:
          // No status needed.
          break;
      }

      // Dictate arrows to denote direction train is going in.
      // TODO: The train icons should really have its own columns...
      let direction = (data.direction == 1) ? 'up' : 'down';
      if (!status) direction = '';

      return (<Row label={data.name} direction={direction} flag={status} key={data.name} />);
    });

    return (
      <div>
        <div className="track">
          {content}
        </div>
        <div className="disclaimer">
          * Directions are assumed to be consistent day-to-day.  The system does not account for single tracking or other delays that might impact the direction the trains are going.  This will be incorporated in a future version of this tracker.
        </div>
      </div>
    );
  }
});

module.exports = Track;
