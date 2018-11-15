import React, { Component } from 'react';

class LeftSideMenu extends Component {


  render(){
    return(
      <div className="left-vert-menu">
      {/*<h3>Left Side Menu</h3>*/}
        <div className="calendar-area">
          <p>Calendar Area</p>
        </div>
        <div className="add-calendars">
          <p>Add calendars</p>
        </div>
        <div className="special-calendars">
          <p>Special Calendars</p>
        </div>
      </div>
    )
  }
}

export default LeftSideMenu;
