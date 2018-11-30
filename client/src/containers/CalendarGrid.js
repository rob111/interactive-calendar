import React, { Component } from 'react';
import Header from '../components/Header';
import Hour from '../components/Hour';
import Tile from '../components/Tile';
import CalEvent from '../components/CalEvent';
import AddButton from '../components/AddButton';
import '../styles/calendar-grid.css';

const tiles = [
  {time: [0,0], text: 'first tile', color: 'red'},
  {time: [2,0], text: 'second tile', color: 'green'},
  {time: [1,3], text: 'third tile', color: 'lightblue'},
  {time: [4,6], text: 'forth tile', color: 'blue'},
  {time: [0, 23], text: 'fifth tile', color: 'grey'}
]

class CalendarGrid extends Component {


  getWeekDays(){
    let weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    let arr = weekDays.map(day => {
      return(
        <Header
          name={day}
          >
        </Header>
      )
    })
    return arr;
  }

  getHours(){
    let hours = [];
    for (var i = 1; i < 24; i++) {
      if (i <= 12) {
        hours.push(<Hour hour={`${i}am`} />);
      }else{
        hours.push(<Hour hour={`${i-12}pm`} />);
      }
    }
    return hours;
  }

  renderTile(i, tile){

    let event = tile ? <CalEvent time={tile.time} text={tile.text} color={tile.color} /> : null;

    return(
      <div key={i} className="event">
        <Tile>
          {event}
        </Tile>
      </div>
    )

  }

  render(){
    const gridTiles = [];

    for (var i = 0; i < 168; i++) {
      let x = i % 7;
      let y = Math.floor(i / 7);
      let event = tiles.find( tile =>  tile.time[0] === x && tile.time[1] === y);
      if (event) {
        gridTiles.push(this.renderTile(i, event));
      } else {
        gridTiles.push(this.renderTile(i, null));
      }
    }

    return(
      <div className="calendar-grid">
        <div className="header">
          <div id="weekday">
            {this.getWeekDays()}
          </div>
        </div>
        <div className="container">
          <div id="hour-numbers">
            {this.getHours()}
          </div>
          <div className="day">
            {gridTiles}
          </div>

        </div>
        <AddButton />
      </div>
    )
  }
}

export default CalendarGrid;
