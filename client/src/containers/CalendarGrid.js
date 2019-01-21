import React, { Component } from 'react';
import Header from '../components/Header';
import Hour from '../components/Hour';
import Tile from '../components/Tile';
import CalEvent from '../components/CalEvent';
import AddButton from '../components/AddButton';
import AddEventModal from './AddEventModal';

import { connect } from 'react-redux';
import { getEvents, postEvent } from '../modules/eventsReducer';

import '../styles/calendar-grid.css';
import moment from 'moment';
// import axios from "axios";


class CalendarGrid extends Component {
  constructor(props){
    super(props);
    this.state = {
      tiles: this.props.tiles,
      showModal: false,
      intervalIsSet: false
    }

    this.addEvent = this.addEvent.bind(this);
    this.toggleModal = this.toggleModal.bind(this);

  }

  componentDidMount() {
    this.props.getEvents();
    if (!this.state.intervalIsSet) {
      let interval = setInterval(this.props.getEvents, 1000);
      this.setState({ intervalIsSet: interval });
    }
  }

  componentWillUnmount() {
    if (this.state.intervalIsSet) {
      clearInterval(this.state.intervalIsSet);
      this.setState({ intervalIsSet: null });
    }
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
    let event = currentTile
    ? <CalEvent
        id={currentTile._id}
        time={currentTile.time}
        height={currentTile.time.length * 43}
        text={currentTile.text}
        color={currentTile.color}
        />
    : null;

    return(
      <div key={i} className="event">
        <Tile>
          {event}
        </Tile>
      </div>
    )
  }

  addEvent(event){
    let currentIds = this.props.tiles.map(event => event.id);
    let newId = 0;
    while (currentIds.includes(newId)){
      ++newId;
    }

    let curDate = event.date instanceof moment ? event.date.utc().valueOf() : event.date;

    let newEvent = {
        id: newId,
        time: event.time,
        date: curDate,
        text: event.text,
        color: event.color
      }

    this.props.postEvent(newEvent);
    this.toggleModal();
  }

  toggleModal() {
    this.setState({ showModal: !this.state.showModal });
  }

  drawGrid(){
    const gridTiles = [];
    let insertedEvents = [];

    for (var i = 0; i < 168; i++) {
      let x = i % 7;
      let y = Math.floor(i / 7);
      let event = this.props.tiles.find( tile =>  {
       if (tile !== undefined) {
          let currentDate = moment(tile.date);
          currentDate = currentDate.toDate().toString().substr(0, 15);
          let dayDate = this.props.dates[x];
          if (dayDate) {
            dayDate = dayDate.toString().substr(0, 15);
          }

          if ((dayDate === currentDate && tile.time.includes(y)) && !insertedEvents.includes(tile)) {
            insertedEvents.push(tile);
            return tile;
          }else {
            return null;
          }
       }
      });
      if (event) {
        gridTiles.push(this.renderTile(i, event));
      } else {
        gridTiles.push(this.renderTile(i, null));
      }
    }
    return gridTiles;
  }

  render(){
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
            {this.drawGrid()}
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
    dates: state.weeksReducer.datesRange,
    tiles: state.eventsReducer.tiles
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getEvents: () => dispatch(getEvents()),
    postEvent: (eventData) => dispatch(postEvent(eventData))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CalendarGrid);
