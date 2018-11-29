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
      <div style={{color: 'white', background: color, width: 85, height: 25, margin: 'auto'}}>
        {text}
      </div>
    )
  }
}

export default CalEvent;
