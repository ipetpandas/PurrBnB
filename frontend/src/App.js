import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import AllSpots from "./components/Spots";
import Spot from "./components/Spots/SpotDetails";
import CreateSpot from "./components/Spots/CreateSpot";
import ManageSpots from "./components/Spots/ManageSpots";
import ManageBookings from "./components/Bookings/ManageBookings";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          {/* <Route path="/signup">
            <SignupFormPage />
          </Route> */}
          <Route exact path="/">
            <AllSpots />
          </Route>
          {/* <Route exact path="/spots/create">
            <CreateSpot />
          </Route> */}
          <Route exact path="/spots/:spotId">
            <Spot />
          </Route>
          <Route exact path="/settings/manage-spots">
            <ManageSpots />
          </Route>
          <Route exact path="/settings/manage-bookings">
            <ManageBookings />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
