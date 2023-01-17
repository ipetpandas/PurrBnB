import OpenModalButton from "../../OpenModalButton";
import EditSpot from "../EditSpot";

const UserSpotCard = ({ userSpot }) => {
  const dummyImageUrl =
    "https://images.pexels.com/photos/1078850/pexels-photo-1078850.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1";
  return (
    <>
      <div
        className="user-spot-previewImage"
        style={{
          backgroundImage: `url(${
            userSpot.previewImage !== "No preview image found" ||
            !userSpot.previewImage.length
              ? userSpot.previewImage
              : dummyImageUrl
          })`,
        }}
      ></div>
      <div className="user-spot-info">{userSpot.address}</div>
      <div className="edit-spot-button-container">
        <OpenModalButton
          modalComponent={<EditSpot userSpot={userSpot} />}
          buttonText="Edit Spot"
        ></OpenModalButton>
      </div>
    </>
  );
};

export default UserSpotCard;
