var React = require('react');
var ReactDOM = require('react-dom');
var Diagram = require('../../components/diagram.jsx');

window.React = React; // For chrome dev tool support

ReactDOM.render(<Diagram />, document.getElementById('react-main-mount'));
