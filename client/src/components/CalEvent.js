import React, { Component } from 'react';


class CalEvent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      time: this.props.time,
      text: this.props.text,
      color: this.props.color
    }
  }

  render(){
    const {color, text, time } = this.state;
    return(
      <div
        className="cal-event"
        style={{
          color: 'white',
          background: color,
          width: '95%',
          height: 50,
          overflowY: 'scroll',
          top: '0',
          left: '0',
          zIndex: '999',
          position: 'relative'
        }}>
        {text}
      </div>
    )
  }
}

export default CalEvent;
