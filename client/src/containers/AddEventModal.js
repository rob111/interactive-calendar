import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import ReactModal from 'react-modal';
import FormField from '../components/FormField';
import '../styles/modal.css';

ReactModal.setAppElement('#root');

export default class AddEventModal extends Component {

  constructor(props){
    super(props);
    this.state = {
      time: '',
      text: '',
      color: ''
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleTimeChange = this.handleTimeChange.bind(this);
    this.handleColorChange = this.handleColorChange.bind(this);
  }

  handleSubmit(e){
    e.preventDefault();
    let newEvent = {
      time: this.state.time,
      text: this.state.text,
      color: this.state.color
    };
    this.props.addEvent(newEvent);
  }

  handleTextChange(e){
    this.setState({text: e.target.value })
  }
  handleTimeChange(e){
    let time = e.target.value.split('');
    for(let i = 0; i < time.length; i++){
      time[i] = parseInt(time[i]);
    }
    this.setState({time: time })
  }
  handleColorChange(e){
    this.setState({color: e.target.value })
  }

  render(){
    let { showModal } = this.props;
    let modalStyle = showModal ? 'modal' : 'modal';
    return(
      <div style={{backgroundColor: "red"}}>
        <ReactModal
          isOpen={showModal}
          contentLabel="onSubmitAddEventAndCloseModal"
          onRequestClose={this.handleCloseModal}
          className="modal"
          overlayClassName="modal-main"
        >
          <p>Add a New Event Form</p>
          <form onSubmit={this.handleSubmit}>
            <FormField
              name="text"
              label="Event Text: "
              value={this.state.text}
              onChange={this.handleTextChange}
            />
            <FormField
              name="time"
              label="Event Time: "
              value={this.state.time}
              onChange={this.handleTimeChange}
            />
            <FormField
              name="color"
              label="Event Color: "
              value={this.state.color}
              onChange={this.handleColorChange}
            />
            <button className="save-btn btn" type="submit" value="Save">Save</button>
          </form>
        </ReactModal>
      </div>
    )
  }
}
