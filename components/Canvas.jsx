import React, { Component } from 'react';
import ReactDOM from 'react-dom';

export default class Canvas extends Component {
  constructor(props) {
    super(props);
    this.paint = this.paint.bind(this);
  }

  componentDidMount() {
    this.context = ReactDOM.findDOMNode(this).getContext('2d');
    this.context.clearRect(0, 0, 200, 200);
    this.paint();
    console.log(this.context)
  }

  paint() {
    this.context.translate(100, 100);
    this.context.rotate(this.props.rotation);
    this.context.fillStyle = '#F00';
    this.context.fillRect(-50, -50, 100, 100);
    this.context.restore();
  }

  componentWillReceiveProps(nextProps) {

  }

  render() {
    return (
        <div/>
    );
  }
};