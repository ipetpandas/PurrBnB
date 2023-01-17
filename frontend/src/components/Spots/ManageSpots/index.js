import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { getUserSpots } from "../../../store/spots";
import UserSpotCard from "./UserSpotCard";
import { useHistory } from "react-router-dom";

import "./ManageSpots.css";

const ManageSpots = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const userSpots = useSelector((state) => state.spots.userSpots);

  const [loaded, setLoaded] = useState(false);

  const redirect = () => {
    console.log("REDIRECTING FROM SETTINGS");
    history.push(`/spots/6`);
  };

  useEffect(() => {
    console.log("Getting User Spots");
    dispatch(getUserSpots()).then(() => {
      setLoaded(true);
    });
    if (loaded) console.log("USER SPOTS", Object.values(userSpots));
  }, [dispatch]);

  if (!sessionUser) return <Redirect to="/" />;

  return (
    <>
      <div className="manage-spots">
        <button className="Redirect" onClick={redirect}>
          REDIRECT
        </button>
        MANAGE MY SPOTS
        {loaded &&
          Object.values(userSpots).map((userSpot) => {
            return (
              <div className="user-spot-card" key={userSpot.id}>
                <UserSpotCard userSpot={userSpot} />
              </div>
            );
          })}
      </div>
    </>
  );
};

export default ManageSpots;
