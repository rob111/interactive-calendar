import React, { Component } from 'react';
import Header from '../components/Header';
import Hour from '../components/Hour';
import Tile from '../components/Tile';
import CalEvent from '../components/CalEvent';
import AddButton from '../components/AddButton';
import AddEventModal from './AddEventModal';
import { connect } from 'react-redux';
import '../styles/calendar-grid.css';

const tiles = [
  {time: [0,0], text: 'first tile', color: "#7986cb"},
  {time: [2,0], text: 'second tile', color: '#34b579'},
  {time: [1,3], text: 'third tile', color: '#e67c74'},
  {time: [4,6], text: 'forth tile', color: '#7986cb'},
  {time: [0, 23], text: 'fifth tile', color: 'grey'}
]

class CalendarGrid extends Component {
  constructor(props){
    super(props);
    this.state = {
      tiles: tiles,
      showModal: false
    }

    this.addEvent = this.addEvent.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
  }


  getWeekDays(){
    const weekdays = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
    if(this.props.dates){
      let arr = this.props.dates.map((day, index) => {
        let name = weekdays[day.getDay()];
        return(
          <Header
            name={name}
            date={day.getDate()}
            key={index}
            >
          </Header>
        )
      })
      return arr;
    }
  }

  getHours(){
    let hours = [];
    for (var i = 1; i < 24; i++) {
      if (i <= 12) {
        hours.push(<Hour key={i} hour={`${i}am`} />);
      }else{
        hours.push(<Hour key={i} hour={`${i-12}pm`} />);
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
    this.toggleModal();
  }

  toggleModal() {
    this.setState({ showModal: !this.state.showModal });
  }

  render(){

    const gridTiles = [];

    for (var i = 0; i < 168; i++) {
      let x = i % 7;
      let y = Math.floor(i / 7);
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
        <AddButton showModal={this.toggleModal} />
        {this.state.showModal ? <AddEventModal  addEvent={this.addEvent} toggleModal={this.toggleModal}/> : null}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    dates: state.weeksReducer.datesRange
  };
};

export default connect(
  mapStateToProps,
  null
)(CalendarGrid);
