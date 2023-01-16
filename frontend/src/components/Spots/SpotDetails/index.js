import React, { useEffect, useState } from "react";
import "./SpotDetails.css";
import { getSpot } from "../../../store/spots";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import SpotImages from "./SpotImages";
import "./SpotDetails.css";

const Spot = () => {
  const dispatch = useDispatch();
  const [loaded, setLoaded] = useState(false);

  const { spotId } = useParams();

  const singleSpot = useSelector((state) => state.spots.spot);

  useEffect(() => {
    console.log(`Dispatching getSpot() with id ${spotId}`);
    dispatch(getSpot(+spotId))
      .then((res) => {
        setLoaded(true);
        return res;
      })
      .then((res) => console.log(res));
  }, [dispatch, spotId]);

  if (Object.keys(singleSpot).length) {
    return (
      <>
        {loaded && (
          <div className="spot-parent">
            <div className="spot-container">
              <div className="spot-header">
                <div className="spot-name-wrapper">{singleSpot.name}</div>
                <div className="spot-details-wrapper">
                  <div className="rating">
                    <span className="star">
                      <i className="fa-solid fa-star fa-xs"></i>
                    </span>
                    {singleSpot.avgStarRating}
                  </div>
                  <span className="dot-divider">.</span>
                  <span className="spot-reviews">
                    {`${singleSpot.numReviews} review${
                      singleSpot.numReviews === 1 ? "" : "s"
                    }`}
                  </span>
                  <span className="dot-divider">.</span>
                  <div className="spot-supperhost">
                    <span className="medal">
                      <i className="fa-solid fa-medal fa-xs"></i>
                    </span>
                    Superhost
                  </div>
                  <span className="dot-divider">.</span>
                  <span className="spot-location">
                    <b>
                      <span>{singleSpot.city + ", "}</span>
                      <span>{singleSpot.state}</span>
                    </b>
                  </span>
                  <div className="images">
                    <SpotImages />
                  </div>
                </div>
              </div>
              <div className="spot-body">
                <div className="spot-host">
                  {`Hosted by ${singleSpot.Owner.firstName} ${singleSpot.Owner.lastName}`}
                </div>
                <div className="divider"></div>
                <div className="spot-special-features">
                  <div className="spot-check-in">
                    <i className="fa-solid fa-door-open"></i>
                    <h1>Self check-in</h1>
                    <h2>Check yourself in with the lockbox.</h2>
                  </div>
                  <div className="spot-special-features-superhost">
                    <i className="fa-solid fa-medal"></i>
                    <h1>{singleSpot.Owner.firstName} is a Superhost</h1>
                    <h2>
                      Superhosts are experienced, highly rated hosts who are
                      committed to providing great stays for guests.
                    </h2>
                  </div>
                  <div className="spot-special-features-cancellation">
                    <h2>Free cancellation for 48 hours.</h2>
                  </div>
                  <div className="divider"></div>
                </div>
                <div className="spot-aircover">
                  <div className="spot-aircover-title">
                    <span className="purrcover-1">purr</span>
                    <span className="purrcover-2">cover</span>
                  </div>
                  <div className="spot-aircover-info">
                    Every booking includes free protection from Host
                    cancellations, listing inaccuracies, and other issues like
                    trouble checking in.
                  </div>
                </div>
                <div className="divider"></div>
                <div className="spot-description">{singleSpot.description}</div>
                <div className="divider"></div>
                <div className="spot-date-picker">Date picker here</div>
              </div>
            </div>
          </div>
        )}
      </>
    );
  } else {
    return (
      <>
        <div className="spinner">Loading...</div>
      </>
    );
  }
};

export default Spot;
