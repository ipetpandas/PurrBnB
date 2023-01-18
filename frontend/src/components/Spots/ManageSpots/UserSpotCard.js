import OpenModalButton from "../../OpenModalButton";
import EditSpot from "../EditSpot";
import DeleteSpot from "../DeleteSpot";
import { NavLink } from "react-router-dom";

const UserSpotCard = ({ userSpot, setSpotDeleted }) => {
  const dummyImageUrl =
    "https://images.pexels.com/photos/1078850/pexels-photo-1078850.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1";
  return (
    <>
      <NavLink to={`/spots/${userSpot.id}`} className="manage-spot-left">
        <div
          className="user-spot-previewImage"
          style={{
            backgroundImage: `url(${
              userSpot.previewImage !== "No preview image found." ||
              !userSpot.previewImage.length
                ? userSpot.previewImage
                : dummyImageUrl
            })`,
          }}
        >
          {/* <img
          className="user-spot-previewImage"
          src={userSpot.previewImage}
        ></img> */}
        </div>
        <div className="user-spot-info">
          <span className="user-spot-name">{userSpot.name}</span>
          <span className="user-spot-address">{userSpot.address}</span>
          <span className="user-spot-city-state">
            {userSpot.city}, {userSpot.state}
          </span>
          <span className="user-spot-price">
            <b>${userSpot.price}</b> night
          </span>
        </div>
      </NavLink>
      <div className="edit-spot-button-container">
        <OpenModalButton
          modalComponent={<EditSpot userSpot={userSpot} />}
          buttonText="Edit"
        ></OpenModalButton>
      </div>
      <div className="delete-spot-button-container">
        <OpenModalButton
          modalComponent={<DeleteSpot userSpot={userSpot} />}
          buttonText={<i className="fa-solid fa-trash"></i>}
          // onModalClose={() => setSpotDeleted(true)}
        ></OpenModalButton>
      </div>
    </>
  );
};

export default UserSpotCard;
