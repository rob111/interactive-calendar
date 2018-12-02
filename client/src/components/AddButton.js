import React, { Component } from 'react';

class AddButton extends Component {
  render(){
    const style = {
      position: 'fixed',
      width: 70,
      height: 70,
      borderRadius: '50%',
      top: 680,
      left: 1300,
      backgroundColor: '#DB4436',
      zIndex: 2,
      color: 'white'
    }
    return(
      <button className="add-button" onClick={this.props.showModal} style={style}>ADD</button>
    )
  }
}

export default AddButton;
