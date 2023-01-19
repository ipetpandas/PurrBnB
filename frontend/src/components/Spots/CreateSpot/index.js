import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import { postSpot } from "../../../store/spots";
import { useModal } from "../../../context/Modal";
import "./CreateSpot.css";

const CreateSpot = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [previewImage, setPreviewImage] = useState("");
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();

  const sessionUser = useSelector((state) => state.session.user);
  if (!sessionUser) return <Redirect to="/" />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);

    const newSpot = {
      address,
      city,
      state,
      country,
      lat,
      lng,
      name,
      price,
      previewImage,
      description,
    };

    let createdSpot = await dispatch(postSpot(newSpot)).catch(async (res) => {
      const data = await res.json();
      if (data && data.errors) setErrors(Object.values(data.errors));
    });

    if (createdSpot) {
      closeModal();
      history.push(`/spots/${createdSpot.id}`);
    }
  };

  return (
    <div className="login-form">
      <div className="login-form-container">
        <header className="login-title-wrapper">
          <div>
            <button className="modal-close-button" onClick={closeModal}>
              <i className="fa-solid fa-x fa-sm"></i>
            </button>
          </div>
          <div className="login-title">Host a spot</div>
          <div></div>
        </header>
        <div className="login-form-wrapper">
          <div className="login-pane">
            <form onSubmit={handleSubmit}>
              <ul>
                {errors.map((error, idx) => (
                  <li key={idx}>{error}</li>
                ))}
              </ul>
              <div className="form-input">
                <div className="input-box-divider">
                  <label htmlFor="addressInput">Address</label>
                  <input
                    className="input-fields"
                    type="text"
                    value={address}
                    placeholder="Address"
                    onChange={(e) => setAddress(e.target.value)}
                    required
                  />
                </div>
                <div className="input-box-divider">
                  <label htmlFor="cityInput">City</label>
                  <input
                    className="input-fields"
                    type="text"
                    value={city}
                    placeholder="City"
                    onChange={(e) => setCity(e.target.value)}
                    required
                  />
                </div>
                <div className="input-box-divider">
                  <label htmlFor="stateInput">State</label>
                  <input
                    className="input-fields"
                    type="text"
                    value={state}
                    placeholder="State"
                    onChange={(e) => setState(e.target.value)}
                    required
                  />
                </div>
                <div className="input-box-divider">
                  <label htmlFor="countryInput">Country</label>
                  <input
                    className="input-fields"
                    type="text"
                    value={country}
                    placeholder="Country"
                    onChange={(e) => setCountry(e.target.value)}
                    required
                  />
                </div>
                <div className="input-box-divider">
                  <label htmlFor="latInput">Latitude</label>
                  <input
                    className="input-fields"
                    type="number"
                    value={lat}
                    placeholder="Latitude"
                    onChange={(e) => setLat(e.target.value)}
                    required
                  />
                </div>
                <div className="input-box-divider">
                  <label htmlFor="lngInput">Longitude</label>
                  <input
                    className="input-fields"
                    type="number"
                    value={lng}
                    placeholder="Longitude"
                    onChange={(e) => setLng(e.target.value)}
                    required
                  />
                </div>
                <div className="input-box-divider">
                  <label htmlFor="nameInput">Cat's Name</label>
                  <input
                    className="input-fields"
                    type="text"
                    value={name}
                    placeholder="Cat's Name"
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                <div className="input-box-divider">
                  <label htmlFor="priceInput">Price</label>
                  <input
                    className="input-fields"
                    type="number"
                    value={price}
                    placeholder="Price"
                    onChange={(e) => setPrice(e.target.value)}
                    required
                  />
                </div>
                <div className="input-box-divider">
                  <label htmlFor="previewImageInput">Preview Image</label>
                  <input
                    className="input-fields"
                    type="text"
                    value={previewImage}
                    placeholder="Preview Image"
                    onChange={(e) => setPreviewImage(e.target.value)}
                    required
                  />
                </div>
                <div className="password-input-box">
                  <label htmlFor="descriptionInput">Description</label>
                  <input
                    className="input-fields"
                    type="text"
                    value={description}
                    placeholder="Description"
                    onChange={(e) => setDescription(e.target.value)}
                    required
                  />
                </div>
              </div>
              <button className="login-button" type="submit">
                <span>Create</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateSpot;
