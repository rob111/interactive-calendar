

const CALCULATE_DATES = 'CALCULATE_DATES';

const SET_DAY = 'SET_DAY';

const setDate = day => {
  return {
    type: SET_DAY,
    date: day
  };
};

const initialState = {
  date: new Date(),
  datesRange: ''
};


const calculateDates = (dispatch) => {
  return  (startDate, endDate) => {
    let dates = [],
    currentDate = startDate,
    addDays = function(days) {
      var date = new Date(this.valueOf());
      date.setDate(date.getDate() + days);
      return date;
    };
    while (currentDate <= endDate) {
      dates.push(currentDate);
      currentDate = addDays.call(currentDate, 1);
    }
    dispatch({type: CALCULATE_DATES, payload: dates});
  };
};

const weeksReducer = (state = initialState, action) => {
  switch (action.type) {
    case CALCULATE_DATES:
      return Object.assign({}, state, {
        datesRange: action.payload
      });
    case SET_DAY:
      return { ...state, date: action.date };
    default:
      return state;
  }
};

export {
  weeksReducer,
  calculateDates,
  setDate
};
