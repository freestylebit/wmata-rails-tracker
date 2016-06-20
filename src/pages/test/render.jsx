const React = require('react');
const ReactDOM = require('react-dom');
const Diagram = require('../../components/diagram.jsx');

window.React = React; // For chrome dev tool support

console.log('asdf');
ReactDOM.render(<Diagram />, document.getElementById('react-main-mount'));
