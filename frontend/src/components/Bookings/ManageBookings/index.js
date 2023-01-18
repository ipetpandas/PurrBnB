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
    dispatch(getUserBookings());
  }, [dispatch]);

  if (!sessionUser) return <Redirect to="/" />;

  return (
    <div className="manage-bookings-parents">
      <div className="bookings-header">Upcoming Trips</div>
      <div className="bookings-container">
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
