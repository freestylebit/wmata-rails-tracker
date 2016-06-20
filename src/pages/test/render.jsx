const React = require('react');
const ReactDOM = require('react-dom');
const Track = require('../../components/track.jsx');

window.React = React; // For chrome dev tool support

ReactDOM.render(<Track />, document.getElementById('react-main-mount'));
