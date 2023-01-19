import { csrfFetch } from "./csrf";

// constant action types
const LOAD_SPOTS = "spots/loadSpots";
const LOAD_SPOT = "spots/loadSpot";
const CREATE_SPOT = "spots/createSpot";
const LOAD_USER_SPOTS = "spots/loadUserSpots";
const UPDATE_USER_SPOT = "spots/updateUserSpot";
const REMOVE_USER_SPOT = "spots/removeUserSpot";

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

export const loadUserSpots = (spots) => {
  return {
    type: LOAD_USER_SPOTS,
    spots,
  };
};

export const updateUserSpot = (spot) => {
  return {
    type: UPDATE_USER_SPOT,
    spot,
  };
};

export const removeSpot = (spotId) => {
  return {
    type: REMOVE_USER_SPOT,
    spotId,
  };
};

// thunks
export const getSpots = () => async (dispatch) => {
  const response = await fetch("/api/spots");

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

export const editSpot = (spot) => async (dispatch) => {
  const spotId = spot.id;
  const response = await csrfFetch(`/api/spots/${spotId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(spot),
  });

  if (response.ok) {
    const editedSpot = await response.json();
    dispatch(updateUserSpot(editedSpot));
    return editedSpot;
  }
};

export const getUserSpots = (user) => async (dispatch) => {
  const response = await csrfFetch("/api/spots/current");

  if (response.ok) {
    const userSpots = await response.json();
    dispatch(loadUserSpots(userSpots));
    return userSpots;
  }
};

export const deleteSpot = (spotId) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${spotId}`, {
    method: "DELETE",
  });

  if (response.ok) {
    const deletedSpot = await response.json();

    dispatch(removeSpot(spotId));
    return deletedSpot;
  }
};

// reducer
const initialState = { spots: {}, spot: {}, userSpots: {} };

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
    case LOAD_USER_SPOTS:
      newState = {
        ...state,
        userSpots: { ...state.userSpots },
      };
      let userSpotsObj = {};
      // console.log("ACTION", action);
      action.spots.Spots.forEach((userSpot) => {
        userSpotsObj[userSpot.id] = userSpot;
      });
      newState.userSpots = userSpotsObj;
      return newState;
    case UPDATE_USER_SPOT:
      newState = {
        ...state,
        spot: { ...state.spot },
        userSpots: { ...state.userSpots },
      };
      // { id, name, city .... }
      Object.keys(action.spot).forEach((attribute) => {
        newState.spot[attribute] = action.spot[attribute];
      });
      if (state.userSpots && state.userSpots[action.spot.id]) {
        let newSpotImage = newState.userSpots[action.spot.id].previewImage;
        newState.userSpots[action.spot.id] = action.spot;
        newState.userSpots[action.spot.id].previewImage = newSpotImage;
      }
      return newState;
    case REMOVE_USER_SPOT:
      newState = {
        ...state,
        spot: { ...state.spot },
        userSpots: { ...state.userSpots },
      };
      newState.spot = {}; // deleting from single spot store
      delete newState.userSpots[action.spotId]; // deleting from manage spot store
      return newState;
    default:
      return state;
  }
};

export default spotsReducer;
