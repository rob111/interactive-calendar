import React, { Component } from 'react';
import LeftSideMenu from './LeftSideMenu';
import CalendarGrid from './CalendarGrid';
import TopBar from './TopBar';

class Home extends Component {

  render(){

    return (
      <div className="home">
        <div className="first-row">
          <TopBar />
        </div>
        <div className="second-row">
          <LeftSideMenu />
          <CalendarGrid />
        </div>
      </div>
    )
  }
}

export default Home;
