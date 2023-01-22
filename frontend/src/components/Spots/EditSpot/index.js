import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import { editSpot } from "../../../store/spots";
import { useModal } from "../../../context/Modal";
import "./EditSpot.css";

const EditSpot = ({ userSpot }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [address, setAddress] = useState(userSpot.address);
  const [city, setCity] = useState(userSpot.city);
  const [state, setState] = useState(userSpot.state);
  const [country, setCountry] = useState(userSpot.country);
  const [lat, setLat] = useState(userSpot.lat);
  const [lng, setLng] = useState(userSpot.lng);
  const [name, setName] = useState(userSpot.name);
  const [price, setPrice] = useState(userSpot.price);
  const [description, setDescription] = useState(userSpot.description);
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();

  const sessionUser = useSelector((state) => state.session.user);
  if (!sessionUser) return <Redirect to="/" />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);

    const spotToUpdate = {
      id: userSpot.id,
      address,
      city,
      state,
      country,
      lat,
      lng,
      name,
      price,
      description,
    };

    let editedSpot = await dispatch(editSpot(spotToUpdate)).catch(
      async (res) => {
        console.log("EDIT RES, ", res);
        const data = await res.json();
        if (data && data.errors) setErrors(Object.values(data.errors));
      }
    );

    if (editedSpot) {
      // console.log("CLOSING MODAL");
      closeModal();
      history.push(`/spots/${userSpot.id}`);
      // console.log("MODAL CLOSED");
    }
  };

  return (
    <div className="login-form">
      <div className="login-form-container">
        <header className="login-title-wrapper">
          <div>
            {/* <button className="modal-close-button" onClick={closeModal}>
              <i className="fa-solid fa-x fa-sm"></i>
            </button> */}
          </div>
          <div className="login-title">Edit your cat</div>
          <div></div>
        </header>
        <div className="login-form-wrapper">
          <div className="login-pane">
            <form onSubmit={handleSubmit}>
              <div className="errors-style">
                {errors.map((error, idx) => (
                  <li key={idx}>{error}</li>
                ))}
              </div>
              <div className="form-input">
                <div className="input-box-divider">
                  <input
                    className="input-fields"
                    type="text"
                    value={address}
                    // placeholder="Address"
                    onChange={(e) => setAddress(e.target.value)}
                    required
                  />
                  <label htmlFor="addressInput">Address</label>
                </div>
                <div className="input-box-divider">
                  <input
                    className="input-fields"
                    type="text"
                    value={city}
                    // placeholder="City"
                    onChange={(e) => setCity(e.target.value)}
                    required
                  />
                  <label htmlFor="cityInput">City</label>
                </div>
                <div className="input-box-divider">
                  <input
                    className="input-fields"
                    type="text"
                    value={state}
                    // placeholder="State"
                    onChange={(e) => setState(e.target.value)}
                    required
                  />
                  <label htmlFor="stateInput">State</label>
                </div>
                <div className="input-box-divider">
                  <input
                    className="input-fields"
                    type="text"
                    value={country}
                    // placeholder="Country"
                    onChange={(e) => setCountry(e.target.value)}
                    required
                  />
                  <label htmlFor="countryInput">Country</label>
                </div>
                <div className="input-box-divider">
                  <input
                    className="input-fields"
                    type="number"
                    value={lat}
                    // placeholder="Latitude"
                    onChange={(e) => setLat(e.target.value)}
                    required
                  />
                  <label htmlFor="latInput">Latitude</label>
                </div>
                <div className="input-box-divider">
                  <input
                    className="input-fields"
                    type="number"
                    value={lng}
                    // placeholder="Longitude"
                    onChange={(e) => setLng(e.target.value)}
                    required
                  />
                  <label htmlFor="lngInput">Longitude</label>
                </div>
                <div className="input-box-divider">
                  <input
                    className="input-fields"
                    type="text"
                    value={name}
                    // placeholder="Cat's Name"
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                  <label htmlFor="nameInput">Cat's Name</label>
                </div>
                <div className="input-box-divider">
                  <input
                    className="input-fields"
                    type="number"
                    value={price}
                    // placeholder="Price"
                    onChange={(e) => setPrice(e.target.value)}
                    required
                  />
                  <label htmlFor="priceInput">Price</label>
                </div>
                <div className="input-box-end">
                  <textarea
                    className="input-textarea"
                    type="text"
                    value={description}
                    // placeholder="Description"
                    onChange={(e) => setDescription(e.target.value)}
                    required
                  />
                  <label htmlFor="descriptionInput">Description</label>
                </div>
              </div>
              <button className="form-button" type="submit">
                <span>Save and Submit</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditSpot;
