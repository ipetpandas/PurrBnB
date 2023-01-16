import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getSpots } from "../../store/spots";
import { useSelector } from "react-redux";
import "./Spots.css";

import SpotCard from "./SpotCard";

const AllSpots = () => {
  const dispatch = useDispatch();

  const allSpots = useSelector((state) => state.spots.spots);
  const spots = Object.values(allSpots);

  useEffect(() => {
    dispatch(getSpots());
  }, [dispatch]);

  return (
    <div className="spots-wrapper">
      {spots.map((spot) => (
        <SpotCard key={spot.id} spot={spot}></SpotCard>
      ))}
    </div>
  );
};

export default AllSpots;
