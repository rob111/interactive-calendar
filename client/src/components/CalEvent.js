import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Close from '@material-ui/icons/Close';
import compose from 'recompose/compose';
import { connect } from 'react-redux';
import { updateEvent, deleteEvent } from '../modules/eventsReducer';
import '../styles/cal-event-styles.css';

const styles = theme => ({
  closeIcon: {
    cursor: 'pointer',
    float: 'right',
    marginRight: 2,
    alignSelf: 'flex-end',
    width: '20px'
  }
})

class CalEvent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDragging: false,
      id: this.props.id,
      time: this.props.time,
      height: this.props.height,
      text: this.props.text,
      color: this.props.color
    }

    this.deleteCalEvent = this.deleteCalEvent.bind(this);
  }

  componentDidMount() {
    window.addEventListener('mousemove', this.resizePanel);
    window.addEventListener('mouseleave', this.stopResize);
    window.addEventListener('mouseup', this.stopResize);
  }

  resizePanel = (event) => {
    if (this.state.isDragging) {
      let height = event.clientY - this.state.initialPos + this.state.height;
      this.setState({
        height: height,
        initialPos: event.clientY
      });
    }
  }

  stopResize = () => {
    if (this.state.isDragging) {
      this.setState({
        isDragging: false,
        height: this.getStep(this.state.height)
      });
      this.updateEventHeight(this.state.id, this.state.time, this.state.height);
    }
  }

  getStep = (height) => {
    return Math.floor(height / 43) * 43;
  }

  startResize = (event) => {
    this.setState({
      isDragging: true,
      initialPos: event.clientY
    });
  }

  formatText = () => {
    const { text, height } = this.state;
    return text.length > 10 && height <= 80 ? text.substring(0, 10) + "..." : text;
  }

  updateEventHeight(id, time, height) {
    let ones = Math.floor(height / 43);
    let arr = [];
    let firstElement = time[0];
    arr.push(firstElement);
    for(let i = 1; i < ones; i++) {
      arr.push(firstElement + i);
    }
    let updates = { $set: { time: arr}};
    let newId = {_id : id};
    this.props.updateEvent(newId, updates);
  }

  deleteCalEvent() {
    let newId = {_id : this.state.id};
    this.props.deleteEvent(newId);
  }

  render(){
    const {color, height} = this.state;
    const { classes } = this.props;
    return(
      <div className="cal-event"  style={{height: `${height}px`, background: color }}>
        <div className="cal-event-body">
          <Close className={classes.closeIcon} onClick={this.deleteCalEvent} />
          <div className="cal-event-tile"><p>{this.formatText()}</p></div>
        </div>
        <div className="resizer-height" onMouseDown={e => this.startResize(e)} onMouseUp={() => this.stopResize()}></div>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateEvent: (id, updates) => dispatch(updateEvent(id, updates)),
    deleteEvent: (id) => dispatch(deleteEvent(id))
  }
}

CalEvent.propTypes = {
  classes: PropTypes.object.isRequired
}

export default compose(
  connect(
    null,
    mapDispatchToProps
  ),
  withStyles(styles)
)(CalEvent);
