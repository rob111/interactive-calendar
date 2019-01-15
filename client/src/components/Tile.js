import React, { Component } from 'react';
import CalEvent from './CalEvent';

class Tile extends Component {

  getEvent() {
    if (!this.props.eventDetails) return;

    if (!this.el) return;
    return <CalEvent cellElement={this.el}/>
  }

  render(){
    return(
      <div ref={el => this.el = el}>
        {this.props.children}
      </div>
    )
  }
}

export default Tile;
