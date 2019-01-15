import React, { Component } from 'react';
import '../styles/cal-event-styles.css';


class CalEvent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDragging: false,
      height: 43,
      text: this.props.text,
      color: this.props.color
    }
    console.log(this.props);
  }

  componentDidMount() {
    window.addEventListener('mousemove', this.resizePanel);
    window.addEventListener('mouseleave', this.stopResize);
    window.addEventListener('mouseup', this.stopResize);
  }

  resizePanel = (event) => {
    if (this.state.isDragging) {
      let height = event.clientY - this.state.initialPos + this.state.height;
      this.setState({
        height: height,
        initialPos: event.clientY
      });
    }
  }

  stopResize = () => {
    if (this.state.isDragging) {
      this.setState({
        isDragging: false,
        height: this.getStep(this.state.height)
      });
    }
  }

  getStep = (height) => {
    return Math.floor(height / 43) * 43;
  }

  startResize = (event) => {
    this.setState({
      isDragging: true,
      initialPos: event.clientY
    });
  }

  formatText = () => {
    const { text, height } = this.state;
    return text.length > 10 && height <= 100 ? text.substring(0, 14) + "..." : text;
  }

  render(){
    const {color, height} = this.state;
    return(
      <div className="cal-event"  style={{height: `${height}px`, background: color}}>
        <div className="cal-event-tile"><p>{this.formatText()}</p></div>
        <div className="resizer-height" onMouseDown={e => this.startResize(e)} onMouseUp={() => this.stopResize()}></div>
      </div>
    )
  }
}

export default CalEvent;
