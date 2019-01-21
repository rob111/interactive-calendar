import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

const styles = theme => ({
  fab: {
    margin: theme.spacing.unit,
    position: 'absolute',
    borderRadius: '50%',
    top: '80%',
    left: '90%',
    backgroundColor: '#DB4436',
    zIndex: 2,
    color: 'white'
  },
  extendedIcon: {
    marginRight: theme.spacing.unit,
  },
});

class AddButton extends Component {
  render(){
    const { classes } = this.props
    return(
      <Fab aria-label="Add" color="secondary" className={classes.fab} onClick={this.props.showModal}>
       <AddIcon />
     </Fab>

    )
  }
}

AddButton.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(AddButton);
