import React, { Component } from 'react';
import CalendarComponent from '../components/CalendarComponent';

class LeftSideMenu extends Component {


  render(){
    return(
      <div className="left-vert-menu">
      {/*<h3>Left Side Menu</h3>*/}
        <div className="calendar-area">
          <CalendarComponent />
        </div>
        
        <div className="special-calendars">
          <p>Special Calendars</p>
        </div>
      </div>
    )
  }
}

export default LeftSideMenu;
