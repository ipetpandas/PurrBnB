import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import "./CreateBooking.css";

const CreateBookingForm = ({}) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [errors, setErrors] = useState([]);

  const sessionUser = useSelector((state) => state.session.user);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);

    const newBooking = {
      startDate,
      endDate,
    };

    // let createdBooking = await dispatch(postBooking(newBooking)).catch(
    //   async (res) => {
    //     const data = await res.json();
    //     if (data && data.errors) setErrors(data.errors);
    //   }
    // );

    // if (createdBooking) {
    //   history.push("settings/manage-bookings");
    // }
  };

  return (
    <div className="booking-container">
      <form className="booking-form">
        <div className="dates-container">
          <div className="booking-date-container-l">
            <label>
              <span className="booking-header">Check-in</span>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                required
              />
            </label>
          </div>
          <div className="booking-date-container">
            <label>
              <span className="booking-header">Check-out</span>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                required
              />
            </label>
          </div>
        </div>
        {sessionUser && (
          <button className="create-booking-button" type="submit">
            Reserve
          </button>
        )}
        {!sessionUser && (
          <div className="booking-pls-login">Log in reserve this cat</div>
        )}
      </form>
    </div>
  );
};

export default CreateBookingForm;
