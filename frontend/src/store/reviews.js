import { csrfFetch } from "./csrf";

// constant action types
const LOAD_SPOT_REVIEWS = "reviews/LOAD_SPOT_REVIEWS";

// action creators
export const actionLoadSpotReviews = (reviews) => {
  return {
    type: LOAD_SPOT_REVIEWS,
    reviews,
  };
};

// thunks
export const getSpotReviews = (spotId) => async (dispatch) => {
  const response = await fetch(`/api/spots/${spotId}/reviews`);

  if (response.ok) {
    const reviews = await response.json();
    dispatch(actionLoadSpotReviews(reviews));
    return reviews;
  }
};

// reducer
const initialState = {
  spotReviews: {},
  userReviews: {},
};

const reviewsReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case LOAD_SPOT_REVIEWS:
      let newReviewObj = {};
      newState = {
        ...state,
        spotReviews: { ...state.userReviews },
        userReviews: { ...state.spotReviews },
      };

      action.reviews.Reviews.forEach((review) => {
        newReviewObj[review.id] = review;
      });

      newState.spotReviews = newReviewObj;
      return newState;
    default:
      return state;
  }
};

export default reviewsReducer;
