import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import LeftSideMenu from './LeftSideMenu';
import RightSideMenu from './RightSideMenu';
import CalendarGrid from './CalendarGrid';
import TopBar from './TopBar';

class Home extends Component {

  render(){
    // <h1>Interactive Calendar</h1>
    // <Link to={'./list'}>
    //   <button>
    //     My List
    //   </button>
    // </Link>
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
