import "./CreateBooking.css";

const CreateBookingForm = ({}) => {
  return (
    <div className="booking-container">
      <div className="booking-form">
        <div className="dates-container">
          <div className="booking-date-container-l">
            <label>
              <span className="booking-header">Check-in</span>
              <input type="date" required />
            </label>
          </div>
          <div className="booking-date-container">
            <label>
              <span className="booking-header">Check-out</span>
              <input type="date" required />
            </label>
          </div>
        </div>
      </div>
      <button className="create-booking-button">Reserve</button>
    </div>
  );
};

export default CreateBookingForm;
