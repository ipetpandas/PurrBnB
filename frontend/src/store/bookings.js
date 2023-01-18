import { csrfFetch } from "./csrf";

// trying out normalizing data
const normalizeData = (array) => {
  let normalized = {};
  array.forEach((element) => {
    normalized[element.id] = element;
  });
  return normalized;
};

// constant action types
const LOAD_USER_BOOKINGS = "bookings/loadUserBookings";

// action creators
export const loadUserBookings = (bookings) => {
  return {
    type: LOAD_USER_BOOKINGS,
    bookings,
  };
};

// thunks
export const getUserBookings = (user) => async (dispatch) => {
  const response = await csrfFetch("/api/bookings/current");

  if (response.ok) {
    const userBookings = await response.json();
    dispatch(loadUserBookings(userBookings));
    return userBookings;
  }
};

// reducer
const initialState = { userBookings: {} };

const bookingsReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case LOAD_USER_BOOKINGS:
      newState = {
        ...state,
        userBookings: normalizeData([...action.bookings.Bookings]),
      };
      return newState;
    default:
      return state;
  }
};

export default bookingsReducer;
