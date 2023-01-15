import { csrfFetch } from "./csrf";

// constant action types
const LOAD_SPOTS = "spots/loadSpots";

// action creators
export const loadSpots = (spots) => {
  return {
    type: LOAD_SPOTS,
    spots,
  };
};

// thunks
export const getSpots = () => async (dispatch) => {
  const response = await fetch("api/spots");

  if (response.ok) {
    const spots = await response.json();
    dispatch(loadSpots(spots));
  }
};

// reducer
const initialState = { spots: {}, spot: {} };

const spotsReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case LOAD_SPOTS:
      let newSpotsObj = {};
      newState = {
        ...state,
        spots: { ...state.spots },
      };
      action.spots.Spots.forEach((spot) => {
        newSpotsObj[spot.id] = spot;
      });
      newState.spots = newSpotsObj;
      return newState;
    default:
      return state;
  }
};

export default spotsReducer;
