import React, { Component } from 'react';
import Calendar from 'react-calendar';
import moment from 'moment';
import { connect } from 'react-redux';
import { setDate, calculateDates } from '../modules/weeksReducer';

import "../styles/calendar-react.css";

class CalendarComponent extends Component {
  constructor(props){
    super(props);
    this.onChange(this.props.date);
    this.onChange = this.onChange.bind(this);
  }

  onChange(e){
    this.props.setDate(e);
    this.getWeekRange(e);
  }

  getWeekRange(e) {
    let startDay = moment(e).startOf('week').toDate();
    let endDay = moment(e).endOf('week').toDate();
    this.props.calculateDates(startDay, endDay);
  }

  render() {

    return(
      <div>
        <Calendar
          onChange={this.onChange}
          value={this.props.date}
          calendarType="US"
          maxDetail="month"
        />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    date: state.weeksReducer.date
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    calculateDates: calculateDates(dispatch),
    setDate: (event) => dispatch(setDate(event))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CalendarComponent);
