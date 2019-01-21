// import axios from 'axios';
const initialState = {
  tiles: [],
  isFetching: false
};

const eventsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_EVENTS_REQUEST:
      return { ...state, isFetching: true };
    case GET_EVENTS_REQUEST_SUCCESS:
      return {...state,
        tiles: action.events,
        isFetching: false
      };
    case POST_EVENT_REQUEST:
      return {...state, isFetching: true };
    case POST_EVENT_REQUEST_SUCCESS:
      const newEvents = state.tiles.concat(action.events);
      return {...state,
        tiles: newEvents,
        isFetching: false
      };
    case POST_EVENT_REQUEST_FAILURE:
      return {...state, isFetching: false };
    case UPDATE_EVENT_REQUEST:
      return {...state, isFetching: true};
    case UPDATE_EVENT_REQUEST_SUCCESS:
      return {...state, isFetching: false};
    case DELETE_EVENT_REQUEST:
      return {...state, isFetching: true };
    case DELETE_EVENT_REQUEST_SUCCESS:
      return {...state, isFetching: false };
    case DELETE_EVENT_REQUEST_FAILURE:
      return {...state, isFetching: false};
    default:
      return state;
  }
};

const GET_EVENTS_REQUEST = 'GET_EVENTS_REQUEST';

const getEventsRequest = () => {
  return {
    type: GET_EVENTS_REQUEST
  };
};

const GET_EVENTS_REQUEST_SUCCESS = 'GET_EVENTS_REQUEST_SUCCESS';

const getEventsRequestSuccess = (events) => {
  return {
    type: GET_EVENTS_REQUEST_SUCCESS,
    events: events
  };
};


const getEvents = () => {
  return (dispatch) => {
    dispatch(getEventsRequest());

    return fetch("api/getEvents")
    .then(data => data.json())
    .then(res => {
      dispatch(getEventsRequestSuccess(res.data))
    })
    .catch(error => console.error("Can't get data from db" + error));
  };
};

const POST_EVENT_REQUEST = 'POST_EVENT_REQUEST';

const postEventRequest = () => {
  return {
    type: POST_EVENT_REQUEST
  };
};

const POST_EVENT_REQUEST_SUCCESS = 'POST_EVENT_REQUEST_SUCCESS';

const postEventRequestSuccess = (event) => {
  return {
    type: POST_EVENT_REQUEST_SUCCESS,
    event: event
  }
}

const POST_EVENT_REQUEST_FAILURE = 'POST_EVENT_REQUEST_FAILURE';

const postEventRequestFailure = () => {
  return {
    type: POST_EVENT_REQUEST_FAILURE
  };
};


const postEvent = (eventData) => {
  return dispatch => {
    dispatch(postEventRequest())

    return fetch("/api/addEvent",
      {
        method: 'POST',
        body: JSON.stringify(eventData),
        credetials: 'same-origin',
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' }
      }
    )
    .then(res => {
      if (res.ok) {
        return res.json();
      }else {
        dispatch(postEventRequestFailure());
        // dispatch(displayAlertMessage("Didn't add new event. Something went wrong."))
        return { error: 'Something went wrong.'}
      }
    })
    .then(event => {
      if(!event.error) {
        dispatch(postEventRequestSuccess(event))
      }
    })
  }
}

const UPDATE_EVENT_REQUEST = 'UPDATE_EVENT_REQUEST';

const updateEventRequest = () => {
  return {
    type: UPDATE_EVENT_REQUEST
  };
};

const UPDATE_EVENT_REQUEST_SUCCESS = 'UPDATE_EVENT_REQUEST_SUCCESS';

const updateEventRequestSuccess = (event) => {
  return {
    type: UPDATE_EVENT_REQUEST_SUCCESS,
    id: event._id,
    event: event
  };
};

const UPDATE_EVENT_REQUEST_FAILURE = 'UPDATE_EVENT_REQUEST_FAILURE';

const updateEventRequestFailure = () => {
  return {
    type: UPDATE_EVENT_REQUEST_FAILURE
  };
};

const updateEvent = (id, updates) => {
  return dispatch => {
    dispatch(updateEventRequest)

    let eventData = {
      id: id,
      update: updates
    }

    return fetch('/api/updateEvent', {
        method: 'POST',
        body: JSON.stringify(eventData),
        credetials: 'same-origin',
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' }
      })
      .then(res => {
        if (res.ok) {
          return res.json();
        }else {
          dispatch(updateEventRequestFailure());
          // dispatch(displayAlertMessage("Didn't add new event. Something went wrong."))
          return { error: 'Something went wrong.'}
        }
      })
      .then(event => {
        if(!event.error) {
          dispatch(updateEventRequestSuccess(event))
        }
      })
  }
}

const DELETE_EVENT_REQUEST = 'DELETE_EVENT_REQUEST';

const deleteEventRequest = () => {
  return {
    type: DELETE_EVENT_REQUEST
  };
};

const DELETE_EVENT_REQUEST_SUCCESS = 'DELETE_EVENT_REQUEST_SUCCESS';

const deleteEventRequestSuccess = (events) => {
  return {
    type: DELETE_EVENT_REQUEST_SUCCESS,
    events: events
  };
};

const DELETE_EVENT_REQUEST_FAILURE = 'DELETE_EVENT_REQUEST_FAILURE';

const deleteEventRequestFailure = () => {
  return {
    type: DELETE_EVENT_REQUEST_FAILURE
  };
};

const deleteEvent = (id) => {
  return dispatch => {
    dispatch(deleteEventRequest)

    return fetch("/api/deleteEvent" , {
      method: "DELETE",
      headers: {"Content-Type" : "application/json"},
      body: JSON.stringify(id)
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }else {
        dispatch(deleteEventRequestFailure());
        // dispatch(displayAlertMessage("Didn't add new event. Something went wrong."))
        return { error: 'Something went wrong.'}
      }
    })
    .then(event => {
      if(!event.error) {
        dispatch(deleteEventRequestSuccess(event))
      }
    })
  }
}

export {
  eventsReducer,
  getEvents,
  postEvent,
  updateEvent,
  deleteEvent
};
