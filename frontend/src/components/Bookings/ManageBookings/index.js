import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserBookings } from "../../../store/bookings";
import { Redirect } from "react-router-dom";
import UserBookingCard from "./UserBookingCard";

import "./UsersBookings.css";

const UsersBookings = () => {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const bookingsObj = useSelector((state) => state.bookings.userBookings);
  const userBookings = Object.values(bookingsObj);

  // const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    console.log("BOOKINGS");
    console.log(bookingsObj);
    console.log(userBookings);
    dispatch(getUserBookings());
  }, [dispatch]);

  if (!sessionUser) return <Redirect to="/" />;

  return (
    <div className="manage-bookings-parents">
      <div className="bookings-header">Upcoming Trips</div>
      <div className="bookings-container">
        {!Object.values(bookingsObj).length && (
          <div>YOU HAVE NO CURRENT BOOKINGS // WILL STYLE THIS LATER</div>
        )}
        {userBookings.map((booking) => {
          return (
            <div className="user-booking-card" key={booking.id}>
              <UserBookingCard booking={booking} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default UsersBookings;
