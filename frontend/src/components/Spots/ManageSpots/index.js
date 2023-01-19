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
  const [spotDeleted, setSpotDeleted] = useState(false);

  // const redirect = () => {
  //   console.log("REDIRECTING FROM SETTINGS");
  //   history.push(`/spots/6`);
  // };

  useEffect(() => {
    console.log("Getting User Spots");
    dispatch(getUserSpots()).then(() => {
      setLoaded(true);
    });
    if (loaded) console.log("USER SPOTS", Object.values(userSpots));
  }, [dispatch]);

  useEffect(() => {
    console.log("spot deleted", spotDeleted);
  }, [spotDeleted]);

  if (!sessionUser) return <Redirect to="/" />;

  return (
    <>
      <div className="manage-spots-parent">
        {/* <button className="Redirect" onClick={redirect}>
          REDIRECT
        </button> */}
        <div className="manage-spots-header">Manage My Spots</div>
        <div className="manage-spots-container">
          {!Object.values(userSpots).length && (
            <div>YOU HAVE NO SPOTS CREATED // WILL STYLE THIS LATER</div>
          )}
          {loaded &&
            Object.values(userSpots).map((userSpot) => {
              return (
                <div className="user-spot-card" key={userSpot.id}>
                  <UserSpotCard
                    userSpot={userSpot}
                    setSpotDeleted={setSpotDeleted}
                  />
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
};

export default ManageSpots;
