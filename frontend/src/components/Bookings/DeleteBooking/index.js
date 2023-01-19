import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useModal } from "../../../context/Modal";
import { useState } from "react";
import { deleteBooking } from "../../../store/bookings";

const DeleteBooking = ({ booking }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [deleteResLoaded, setDeleteResLoaded] = useState(false);
  const [deleteRes, setDeleteRes] = useState("");
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();

  const handleDelete = async () => {
    const deleteResponse = await dispatch(deleteBooking(booking.id)).catch(
      async (res) => {
        console.log("UH OH");
        const data = await res.json();
        console.log(data);
        if (data && data.message) setErrors([data.message]);
      }
    );

    if (deleteResponse.statusCode === 200) {
      // console.log("DELETE RES 2, ", deleteResponse);
      setDeleteRes(deleteResponse.message);
      // console.log(deleteRes);
    }
    setDeleteResLoaded(true);

    history.push("/settings/manage-bookings");
  };

  return (
    <>
      <div className="delete-spot-parent">
        <div className="delete-spot-container">
          <div className="delete-spot-header">
            {!deleteResLoaded && (
              <>
                <div className="delete-spot-title">
                  Are you sure you want to cancel{" "}
                  <span style={{ fontWeight: "bold" }}>
                    {booking.Spot.name}
                  </span>
                  ?
                </div>
              </>
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
              <div className="delete-booking-errors">
                {errors.map((error, idx) => (
                  <li key={idx}>{error}</li>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default DeleteBooking;
