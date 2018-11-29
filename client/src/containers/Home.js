import React, { Component } from 'react';
import LeftSideMenu from './LeftSideMenu';
import RightSideMenu from './RightSideMenu';
import CalendarGrid from './CalendarGrid';
import TopBar from './TopBar';

class Home extends Component {

  render(){

    return (
      <div>
        <div className="first-row">
          <TopBar />
        </div>
        <div className="second-row">
          <LeftSideMenu />
          <CalendarGrid />
          <RightSideMenu />
        </div>
      </div>
    )
  }
}

export default Home;
