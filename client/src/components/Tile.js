import React, { Component } from 'react';

class Tile extends Component {


  render(){
    return(
      <div className="tile">
        {this.props.children}
      </div>
    )
  }
}

export default Tile;
