import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { postBooking } from "../../../store/bookings";
import "./CreateBooking.css";

const CreateBookingForm = ({ singleSpot }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { spotId } = useParams();

  // formatting to set today's date
  const today = new Date();
  let startMonth = today.getMonth() + 1;
  let startDay = today.getDate();
  const startYear = today.getFullYear();
  if (+startMonth < 10) startMonth = "0" + startMonth;
  if (+startDay < 10) startDay = "0" + startDay;
  const formattedStartDate = `${startYear}-${startMonth}-${startDay}`;

  // formatting tomorrow's date
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  let endMonth = tomorrow.getMonth() + 1;
  let endDay = tomorrow.getDate();
  const endYear = tomorrow.getFullYear();
  if (+endMonth < 10) endMonth = "0" + endMonth;
  if (+endDay < 10) endDay = "0" + endDay;
  const formattedEndDate = `${endYear}-${endMonth}-${endDay}`;

  const [startDate, setStartDate] = useState(formattedStartDate);
  const [endDate, setEndDate] = useState(formattedEndDate);
  const [errors, setErrors] = useState([]);

  // nights calculation based on input dates for total price
  const startDateCalc = new Date(startDate); // need to convert to object
  const endDateCalc = new Date(endDate);
  // calculate the days/nights
  const perNight = Math.floor(
    (endDateCalc - startDateCalc) / (1000 * 3600 * 24) || 0
  );

  useEffect(() => {
    console.log(formattedStartDate);
    console.log("START DATE", startDate);
    console.log("END DATE", endDate);
    console.log("END DATE", formattedEndDate);
  }, [startDate, endDate]);

  const sessionUser = useSelector((state) => state.session.user);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);

    const newBooking = {
      startDate,
      endDate,
    };

    let createdBooking = await dispatch(postBooking(+spotId, newBooking)).catch(
      async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      }
    );

    if (createdBooking) {
      history.push("/settings/manage-bookings");
    }
  };

  return (
    <div className="booking-container">
      <form onSubmit={handleSubmit} className="booking-form">
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
      <div className="booking-not-charged">You won't be charged yet</div>
      <div className="fee-wrapper">
        <div className="fees">
          <span className="fees-underline">
            ${singleSpot.price} x {perNight} night
          </span>
          <span>${singleSpot.price * perNight}</span>
        </div>
        <div className="fees">
          <span className="fees-underline">Cleaning fee</span>
          <span>$125</span>
        </div>
        <div className="fees">
          <span className="fees-underline">Service fee</span>
          <span>$221</span>
        </div>
        <div className="fee-total">
          <span>Total before taxes</span>
          <span>${singleSpot.price * perNight + 125 + 221}</span>
        </div>
      </div>
    </div>
  );
};

export default CreateBookingForm;
