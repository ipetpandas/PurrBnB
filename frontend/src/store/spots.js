import { csrfFetch } from "./csrf";

// constant action types
const LOAD_SPOTS = "spots/loadSpots";
const LOAD_SPOT = "spots/loadSpot";
const CREATE_SPOT = "spots/createSpot";

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

export const createSpot = (spot) => {
  return {
    type: CREATE_SPOT,
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

export const postSpot = (spot) => async (dispatch) => {
  const response = await csrfFetch("/api/spots", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(spot),
  });

  if (response.ok) {
    const newSpot = await response.json();
    const newSpotId = newSpot.id;
    const previewImageResponse = await csrfFetch(
      `/api/spots/${newSpotId}/images`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: spot.previewImage, preview: true }),
      }
    );

    if (previewImageResponse.ok) {
      newSpot.SpotImages = [previewImageResponse];
    }

    dispatch(createSpot(newSpot));
    return newSpot;
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
    case CREATE_SPOT:
      newState = {
        ...state,
        spot: { ...state.spot },
        spots: { ...state.spots },
      };
      newState.spots[action.spot.id] = action.spot;
      return newState;
    default:
      return state;
  }
};

export default spotsReducer;
