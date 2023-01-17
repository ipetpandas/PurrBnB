import "./DeleteSpot.css";
import { deleteSpot } from "../../../store/spots";
import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { useModal } from "../../../context/Modal";
import { useHistory } from "react-router-dom";

const DeleteSpot = ({ userSpot, isFromSpotDetails }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [deleteResLoaded, setDeleteResLoaded] = useState(false);
  const [deleteRes, setDeleteRes] = useState("");
  const { closeModal } = useModal();

  const handleDelete = async () => {
    const deleteResponse = await dispatch(deleteSpot(userSpot.id));
    setDeleteRes(deleteResponse.message);
    setDeleteResLoaded(true);

    // redirecting the user back to homepage through isFromSpotDetails prop
    if (isFromSpotDetails) {
      console.log("TRYING TO PUSH TO /");
      history.push("/");
    }
  };

  return (
    <>
      <div className="delete-spot-parent">
        <div className="delete-spot-container">
          <div className="delete-spot-header">
            {!deleteResLoaded && (
              <div className="delete-spot-title">
                Are you sure you want to delete{" "}
                <span style={{ fontWeight: "bold" }}>{userSpot.name}</span>?
              </div>
            )}
            {deleteResLoaded && (
              <>
                <div>YAY</div>
                <div>{deleteRes}</div>
              </>
            )}
          </div>
          {!deleteResLoaded && (
            <div className="delete-spot-buttons">
              <button
                className="delete-modal-buttons cancel-button"
                onClick={closeModal}
              >
                Cancel
              </button>
              <button
                className="delete-modal-buttons delete-button"
                onClick={handleDelete}
              >
                <span>Delete</span>
                <i className="fa-solid fa-trash"></i>
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default DeleteSpot;
