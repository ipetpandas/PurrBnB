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
const CREATE_BOOKING = "bookings/createBooking";
const REMOVE_BOOKING = "bookings/removeBooking";

// action creators
export const loadUserBookings = (bookings) => {
  return {
    type: LOAD_USER_BOOKINGS,
    bookings,
  };
};

export const createBooking = (booking) => {
  return {
    type: CREATE_BOOKING,
    booking,
  };
};

export const removeBooking = (bookingId) => {
  return {
    type: REMOVE_BOOKING,
    bookingId,
  };
};

// thunks
export const getUserBookings = () => async (dispatch) => {
  const response = await csrfFetch("/api/bookings/current");

  if (response.ok) {
    const userBookings = await response.json();
    dispatch(loadUserBookings(userBookings));
    return userBookings;
  }
};

export const postBooking = (spotId, input) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${spotId}/bookings`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });

  if (response.ok) {
    const newBooking = await response.json();
    const spot = await csrfFetch(`/api/spots/${spotId}`);
    const spotRes = await spot.json();
    if (spot.ok) {
      newBooking.Spot = spotRes;
    }
    dispatch(createBooking(newBooking));
    return newBooking;
  }
};

export const deleteBooking = (bookingId) => async (dispatch) => {
  console.log(`ATTEMPTING TO DELETE Booking ${bookingId} `);
  const response = await csrfFetch(`/api/bookings/${bookingId}`, {
    method: "DELETE",
  });
  console.log(response);

  if (response.ok) {
    const deletedBooking = await response.json();

    dispatch(removeBooking(bookingId));
    return deletedBooking;
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
    case CREATE_BOOKING:
      newState = {
        ...state,
        userBookings: { ...state.userBookings },
      };
      newState.userBookings[action.booking.id] = action.booking;
      return newState;
    case REMOVE_BOOKING:
      newState = {
        ...state,
        userBookings: { ...state.userBookings },
      };
      delete newState.userBookings[action.bookingId];
      return newState;
    default:
      return state;
  }
};

export default bookingsReducer;
