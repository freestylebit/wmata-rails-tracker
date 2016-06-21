const React = require('react');
const ReactDOM = require('react-dom');
const Track = require('../../components/track.jsx');

window.React = React; // For chrome dev tool support

// Include stylesheet for the component.
require('./line.scss');

ReactDOM.render(<Track />, document.getElementById('track-status'));
