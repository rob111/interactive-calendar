import React, { Component } from 'react';
import Header from '../components/Header';
import Hour from '../components/Hour';
import Tile from '../components/Tile';
import CalEvent from '../components/CalEvent';
import AddButton from '../components/AddButton';
import AddEventModal from './AddEventModal';
import '../styles/calendar-grid.css';

const tiles = [
  {time: [0,0], text: 'first tile', color: 'red'},
  {time: [2,0], text: 'second tile', color: 'green'},
  {time: [1,3], text: 'third tile', color: 'lightblue'},
  {time: [4,6], text: 'forth tile', color: 'blue'},
  {time: [0, 23], text: 'fifth tile', color: 'grey'}
]

class CalendarGrid extends Component {
  constructor(){
    super();
    this.state = {
      tiles: tiles,
      showModal: false
    }

    this.addEvent = this.addEvent.bind(this);
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
  }


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

  renderTile(i, currentTile){

    let event = currentTile ? <CalEvent time={currentTile.time} text={currentTile.text} color={currentTile.color} /> : null;

    return(
      <div key={i} className="event">
        <Tile>
          {event}
        </Tile>
      </div>
    )
  }

  addEvent(event){
    this.setState({ tiles: this.state.tiles.concat(event)});
    this.handleCloseModal();
  }

  handleOpenModal() {
    this.setState({ showModal: true });
  }

  handleCloseModal() {
    this.setState({ showModal: false });
  }

  render(){
    const gridTiles = [];

    for (var i = 0; i < 168; i++) {
      let x = i % 7;
      let y = Math.floor(i / 7);
      console.log(this.state.tiles);
      let event = this.state.tiles.find( tile =>  tile.time[0] === x && tile.time[1] === y);
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
        <AddButton showModal={this.handleOpenModal} />
        <AddEventModal  addEvent={this.addEvent} showModal={this.state.showModal}/>
      </div>
    )
  }
}

export default CalendarGrid;
