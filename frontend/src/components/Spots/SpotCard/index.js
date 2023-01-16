import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getSpots } from "../../../store/spots";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./SpotCard.css";

const SpotCard = ({ spot }) => {
  const dispatch = useDispatch();

  const dummyImageUrl =
    "https://images.pexels.com/photos/1078850/pexels-photo-1078850.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1";
  return (
    <Link to={`/spots/${spot.id}`} className="spot-card" key={spot.id}>
      <div
        className="picture"
        style={{
          backgroundImage: `url(${
            spot.previewImage !== "No preview image found"
              ? spot.previewImage
              : dummyImageUrl
          })`,
        }}
      ></div>
      <div className="spot-info">
        <div className="location-rating-wrapper">
          <div className="location">
            <b>
              <span>{spot.city + ", "}</span>
              <span>{spot.state}</span>
            </b>
          </div>
          <div className="rating">
            <span className="star-icon">
              <i className="fa-solid fa-star fa-xs"></i>
            </span>
            {spot.avgRating}
          </div>
        </div>
        <div className="distance-wrapper">54 miles away</div>
        <div className="vacancy-wrapper">Apr 12 - Apr 24</div>
        <div className="price-wrapper">
          <b>${spot.price}</b> night
        </div>
      </div>
    </Link>
  );
};

export default SpotCard;
