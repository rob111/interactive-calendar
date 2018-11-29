import React from 'react';
import '../styles/calendar-grid.css';

const Header = (props) => {
  return(
      <div className="weekDay">
      {props.name}
      </div>
  );
}

export default Header;
