import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';


const styles = {
  name: {
    fontSize: '15px',
    margin: '0 auto'
  },
  date: {
    fontSize: '33px',
    margin: '0 auto'
  },
  row: {
    display: 'flex'
  }
}

const Header = (props) => {
  const { classes } = props;
  return(
      <div className="weekDay">
        <div className={classes.row}>
          <span className={classes.name}>{props.name}</span>
        </div>
        <div className={classes.row}>
          <span className={classes.date}>{props.date}</span>
        </div>
      </div>
  );
}

Header.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Header);
