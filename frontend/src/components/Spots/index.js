import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getSpots } from "../../store/spots";
import { useSelector } from "react-redux";

const AllSpots = () => {
  const dispatch = useDispatch();

  const allSpots = useSelector((state) => state.spots.spots);

  useEffect(() => {
    dispatch(getSpots());
  }, [dispatch]);

  return <div>TESTING HELLO IF YOU SEE ME THEN I AM WORKING YAY</div>;
};

export default AllSpots;
