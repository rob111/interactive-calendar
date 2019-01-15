import React, { Component } from 'react';
import Header from '../components/Header';
import Hour from '../components/Hour';
import Tile from '../components/Tile';
import CalEvent from '../components/CalEvent';
import AddButton from '../components/AddButton';
import AddEventModal from './AddEventModal';
import { connect } from 'react-redux';
import '../styles/calendar-grid.css';
import moment from 'moment';
import axios from "axios";

  // {time: 10, text: 'New Live Event Event', date: 1546205512675},
  // {time: 5, text: 'Good Morning on Tuesday January January January January January 8th at five o\'clock', date: 1546773765976},
  // {time: 22, text: 'Just checking January January January January Januaryevent', date: 1546776786761}


class CalendarGrid extends Component {
  constructor(props){
    super(props);
    this.state = {
      tiles: [],
      showModal: false,
      intervalIsSet: false
    }

    this.addEvent = this.addEvent.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
  }

  componentDidMount() {
    this.getDataFromDb();
    if (!this.state.intervalIsSet) {
      let interval = setInterval(this.getDataFromDb, 1000);
      this.setState({ intervalIsSet: interval });
    }
  }

  componentWillUnmount() {
    if (this.state.intervalIsSet) {
      clearInterval(this.state.intervalIsSet);
      this.setState({ intervalIsSet: null });
    }
  }

  getDataFromDb = () => {
    fetch("/api/getEvents")
      .then(data => data.json())
      .then(res => this.setState({ tiles: res.data }))
      .catch(error => console.error("Can't get data from db" + error))
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

    let event = currentTile ? <CalEvent time={currentTile.time} text={currentTile.text} color="#7986cb" /> : null;

    return(
      <div key={i} className="event">
        <Tile>
          {event}
        </Tile>
      </div>
    )
  }

  addEvent(event){
    let currentIds = this.state.tiles.map(event => event.id);
    let newId = 0;
    while (currentIds.includes(newId)){
      ++newId;
    }

    let curDate = event.date instanceof moment ? event.date.utc().valueOf() : event.date;

    let newEvent = {
        id: newId,
        time: event.time,
        date: curDate,
        text: event.text
      }

    axios.post("/api/addEvent", {
      event: newEvent
    });

    this.setState({ tiles: this.state.tiles.concat(newEvent)});
    this.toggleModal();
  }

  toggleModal() {
    this.setState({ showModal: !this.state.showModal });
  }

  drawGrid(){
    const gridTiles = [];

    for (var i = 0; i < 168; i++) {
      let x = i % 7;
      let y = Math.floor(i / 7);
      let event = this.state.tiles.find( tile =>  {
        let currentDate = moment(tile.date);
        currentDate = currentDate.toDate().toString().substr(0, 15);
        let dayDate = this.props.dates[x];
        if (dayDate) {
          dayDate = dayDate.toString().substr(0, 15);
        }
        return tile ? dayDate === currentDate && tile.time.includes(y) : null;
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
    dates: state.weeksReducer.datesRange
  };
};

export default connect(
  mapStateToProps,
  null
)(CalendarGrid);
