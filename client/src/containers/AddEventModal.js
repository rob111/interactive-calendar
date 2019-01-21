import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import Close from '@material-ui/icons/Close';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import { DatePicker } from 'material-ui-pickers';
import { MuiPickersUtilsProvider } from 'material-ui-pickers';
import MomentUtils from '@date-io/moment';
import Radio from '@material-ui/core/Radio';



function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const styles = theme => ({
  paper: {
    position: 'absolute',
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4
  },
  closeIcon: {
    cursor: 'pointer',
    float: 'right',
    width: '20px'
  },
  container: {
    display: 'flex',
    flexDirection: 'column'
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,

  },
  formControl: {
    flex: 1

  },
  saveButton: {
    marginLeft: 'auto',
    marginTop: '20px',
    backgroundColor: '#7986cb',
    color: 'white'
  },
  dateAndTime: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    display: 'flex'
  },
  textFieldDate: {
    flex: 1,
  },
  rootColor: {
    marginTop: 15,
  },
  greenRadio : {
    color: '#4CAF50',
    '&$checked': {
      color: '#4CAF50',
    },
  },
  deepOrangeRadio : {
    color: '#FF5722',
    '&$checked': {
      color: '#FF5722',
    },
  },
  blueRadio : {
    color: '#7986cb',
    '&$checked': {
      color: '#7986cb',
    },
  },
  amberRadio : {
    color: '#FFC107',
    '&$checked': {
      color: '#FFC107',
    },
  },
  checked: {}
});

class AddEventModal extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      open: true,
      name: '',
      date: Date.now(),
      time: '',
      selectedColor: '#7986cb'
    };
  }

  handleClose = () => {
    this.props.toggleModal();
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  }

  timeRange = () => {
    const times = [
      {0: '0am'},{1: '1am'},{2: '2am'},{3: '3am'},{4: '4am'},
      {5: '5am'},{6: '6am'},{7: '7am'},{8: '8am'},{9: '9am'},
      {10: '10am'},{11: '11am'},{12: '12pm'},{13: '1pm'},{14: '2pm'},
      {15: '3pm'},{16: '4pm'},{17: '5pm'},{18: '6pm'},{19: '7pm'},
      {20: '8pm'},{21: '9pm'},{22: '10pm'},{23: '11pm'}
    ];

    let menuItems = times.map((object, key) => {
      return(
        <MenuItem value={key} key={key}>{object[key]}</MenuItem>
      )
    });

    return menuItems;
  }

  handleDateChange = date => this.setState({ date })

  handleSubmit = () => {
    let timeArr = [];
    timeArr.push(this.state.time);
    let newEvent = {
      text: this.state.name,
      time: timeArr,
      date: this.state.date,
      color: this.state.selectedColor
     }

    this.props.addEvent(newEvent);
  }

  handleChangeColor = (event) => {
    this.setState({ selectedColor: event.target.value })
  }

  addColorRadioButtons() {
    const { classes } = this.props;

    const colors = [
      {colorName: 'green', className: classes.greenRadio, colorHex: '#4CAF50'},
      {colorName: 'amber', className: classes.amberRadio, colorHex: '#FFC107'},
      {colorName: 'blue', className: classes.blueRadio, colorHex: '#7986cb'},
      {colorName: 'deepOrange', className: classes.deepOrangeRadio, colorHex: '#FF5722'}
    ];
    let radioButtonArr = colors.map((color, i) => {
      return (
        <Radio
          key={i}
           checked={this.state.selectedColor === color.colorHex}
           onChange={this.handleChangeColor}
           value={color.colorHex}
           name="radio-button"
           aria-label={color.colorName}
           classes={{
             root: color.className,
             checked: classes.checked,
           }}
       />
      )
    });

    return radioButtonArr;
  }

  render() {
    const { classes } = this.props;

    return (
      <div>
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.state.open}
          onClose={this.handleClose}
        >
          <div style={getModalStyle()} className={classes.paper}>
            <Close className={classes.closeIcon} onClick={this.handleClose} />
            <Typography variant="h6" id="modal-title">
              Create a New Event
            </Typography>
            <Typography variant="subtitle1" id="simple-modal-description">
              <form className={classes.container} noValidate autoComplete="off">
                <TextField
                   id="standard-name"
                   label="Event"
                   className={classes.textField}
                   value={this.state.name}
                   onChange={this.handleChange('name')}
                   margin="normal"
                />
                <div className={classes.dateAndTime}>
                  <MuiPickersUtilsProvider utils={MomentUtils}>
                    <DatePicker
                      label="Date"
                      value={this.state.date}
                      onChange={this.handleDateChange}
                    />
                  </MuiPickersUtilsProvider>
                  <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="time-simple">Time</InputLabel>
                      <Select
                      value={this.state.time}
                      onChange={this.handleChange('time')}
                      inputProps={{
                        name: 'time',
                        id: 'time-simple',
                      }}
                      >
                        {this.timeRange()}
                      </Select>
                  </FormControl>
                </div>
                <div className={classes.rootColor}>
                  {this.addColorRadioButtons()}
                </div>
                <Button variant="outlined" className={classes.saveButton} onClick={this.handleSubmit}>Save</Button>
              </form>
            </Typography>
          </div>
        </Modal>
      </div>
    );
  }
}

AddEventModal.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AddEventModal);
