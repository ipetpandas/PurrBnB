import { csrfFetch } from "./csrf";

// constant action types
const LOAD_SPOTS = "spots/loadSpots";
const LOAD_SPOT = "spots/loadSpot";

// action creators
export const loadSpots = (spots) => {
  return {
    type: LOAD_SPOTS,
    spots,
  };
};

export const loadSpot = (spot) => {
  return {
    type: LOAD_SPOT,
    spot,
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

export const getSpot = (spotId) => async (dispatch) => {
  const response = await fetch(`/api/spots/${spotId}`);

  if (response.ok) {
    const spot = await response.json();
    console.log("THUNK", spot);
    dispatch(loadSpot(spot));
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
    case LOAD_SPOT:
      newState = {
        ...state,
        spot: { ...state.spot },
      };
      newState.spot = { ...action.spot };
      return newState;
    default:
      return state;
  }
};

export default spotsReducer;
