import React, { useEffect, useState } from "react";
import { getSpot } from "../../../store/spots";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory, useParams } from "react-router";
import SpotImages from "./SpotImages";
import OpenModalButton from "../../OpenModalButton";
import EditSpot from "../EditSpot";
import DeleteSpot from "../DeleteSpot";
import { useModal } from "../../../context/Modal";
import "./SpotDetails.css";

const Spot = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [loaded, setLoaded] = useState(false);
  const { closeModal } = useModal();

  const { spotId } = useParams();

  const singleSpot = useSelector((state) => state.spots.spot);
  const sessionUser = useSelector((state) => state.session.user);

  // image grid here
  const spotImages = singleSpot?.SpotImages;
  const previewImages = spotImages?.filter((image) => image.preview === true);
  let bigImage = {
    url: "https://images.pexels.com/photos/1078850/pexels-photo-1078850.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    preview: true,
  };

  let smallImages;
  if (previewImages?.length) {
    if (previewImages[0].url !== "No preview image found.") {
      bigImage = previewImages[0];
    }
    smallImages = previewImages.slice(1);
  }

  let imageGrid;
  if (smallImages?.length === 4) {
    imageGrid = (
      <div className="image-grid">
        <img className="large-preview" src={bigImage.url} />
        <div className="rest-preview">
          {smallImages.map((image) => (
            <img className="small-previews" key={image.id} src={image.url} />
          ))}
        </div>
      </div>
    );
  } else {
    imageGrid = (
      <div className="single-image-grid">
        <img
          className="large-preview"
          src={
            // previewImages[0].url !== "No preview image found."
            //   ? previewImages[0].url
            //   :
            bigImage.url
          }
        />
      </div>
    );
  }
  // image grid end

  useEffect(() => {
    console.log(`Dispatching getSpot() with id ${spotId}`);
    dispatch(getSpot(+spotId)).then(() => {
      setLoaded(true);
    });
    // after a valid user deletes a spot from their spot details page, redirect back to home page
    // if (!singleSpot) {
    //   history.push("/");
    // }
  }, [dispatch, spotId]);

  if (Object.keys(singleSpot).length) {
    return (
      <>
        {loaded && (
          <div className="spot-parent">
            <div className="spot-container">
              <div className="spot-header">
                <div className="spot-name-wrapper">
                  <span>{singleSpot.name}</span>
                  {/* check for user's ID only if session user exists */}
                  {sessionUser?.id === singleSpot.ownerId && (
                    <div className="buttons">
                      <div className="edit-spot-button-container">
                        <OpenModalButton
                          modalComponent={<EditSpot userSpot={singleSpot} />}
                          buttonText="Edit"
                        ></OpenModalButton>
                      </div>
                      <div className="delete-spot-button-container">
                        <OpenModalButton
                          modalComponent={
                            <DeleteSpot
                              userSpot={singleSpot}
                              isFromSpotDetails={true}
                            />
                          }
                          buttonText={<i className="fa-solid fa-trash"></i>}
                          // onModalClose={() => history.push("/")}
                          // onButtonClick={() => {
                          //   console.log("clicking trash button");
                          // }}
                        ></OpenModalButton>
                      </div>
                    </div>
                  )}
                </div>
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
                </div>
              </div>
              <div className="images">
                {/* <SpotImages /> */}
                {imageGrid}
              </div>
              <div className="spot-body">
                <div className="left-body">
                  <div className="spot-host">
                    {`Hosted by ${singleSpot.Owner.firstName} ${singleSpot.Owner.lastName}`}
                  </div>
                  <div className="divider"></div>
                  <div className="spot-special-features">
                    <div className="spot-check-in">
                      <div className="icon">
                        <i className="fa-solid fa-door-open fa-xl"></i>
                      </div>
                      <div className="check-in-info">
                        <h1>Self check-in</h1>
                        <h2>Check yourself in with the lockbox.</h2>
                      </div>
                    </div>
                    <div className="spot-superhost">
                      <div className="icon">
                        <i className="fa-solid fa-medal fa-xl"></i>
                      </div>
                      <div className="superhost-info">
                        <h1>{singleSpot.Owner.firstName} is a Superhost</h1>
                        <h2>
                          Superhosts are experienced, highly rated hosts who are
                          committed to providing great stays for guests.
                        </h2>
                      </div>
                    </div>
                    <div className="spot-cancellation">
                      <div className="icon">
                        <i className="fa-solid fa-calendar fa-xl"></i>
                      </div>
                      <div className="cancellation-info">
                        <h1>Free cancellation for 48 hours</h1>
                      </div>
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
                  <div className="spot-description">
                    {singleSpot.description}
                  </div>
                  <div className="divider"></div>
                  <div className="spot-date-picker">Date picker here</div>
                </div>
                <div className="price-parent">
                  <div className="price-container">
                    <div className="price-header">
                      <span className="price">
                        <span className="num">${singleSpot.price}</span>
                        <span className="night">night</span>
                      </span>
                      <div className="price-header-right">
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
                      </div>
                    </div>
                    <div className="booking-body">
                      <div className="booking-form">
                        <div className="booking-dates">
                          <div className="booking-checkin">Check-in</div>
                          <div className="booking-checkout">Checkout</div>
                        </div>
                        <button className="create-booking-button">
                          Reserve
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
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
