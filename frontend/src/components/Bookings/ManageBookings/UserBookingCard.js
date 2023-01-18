import { NavLink } from "react-router-dom";

const UserBookingCard = ({ booking }) => {
  const dummyImageUrl =
    "https://images.pexels.com/photos/1078850/pexels-photo-1078850.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1";
  return (
    <>
      <NavLink to={`/spots/${booking.Spot.id}`} className="manage-booking-left">
        <div
          className="user-spot-previewImage"
          style={{
            backgroundImage: `url(${
              booking.Spot.previewImage !== "No preview image found." ||
              !booking.Spot.previewImage.length
                ? booking.Spot.previewImage
                : dummyImageUrl
            })`,
          }}
        ></div>
        <div className="user-booking-info">
          <span className="user-booking-name">{booking.Spot.name}</span>
          <span className="user-booking-address">{booking.Spot.address}</span>
          <span className="user-booking-city-state">
            {booking.Spot.city}, {booking.Spot.state}
          </span>
          <span className="booking-country">{booking.Spot.country}</span>
          <div className="booking-divider"></div>
          <div className="booking-dates-container">
            <div className="checkin-container">
              <span className="check-header">Check-in</span>
              <span className="booking-dates">
                {booking.startDate.split("T")[0]}
              </span>
            </div>
            <div className="checkout-container">
              <span className="check-header">Check-out</span>
              <span className="booking-dates">
                {booking.endDate.split("T")[0]}
              </span>
            </div>
          </div>
        </div>
      </NavLink>
      <div className="delete-spot-button-container">
        {/* <OpenModalButton
          modalComponent={<DeleteSpot userSpot={userSpot} />}
          buttonText={<i className="fa-solid fa-trash"></i>}
          // onModalClose={() => setSpotDeleted(true)}
        ></OpenModalButton> */}
      </div>
    </>
  );
};

export default UserBookingCard;
