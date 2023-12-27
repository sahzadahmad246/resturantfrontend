import React, { useState, useEffect } from "react";
import Alert from "@mui/material/Alert";

import CircularProgress from "@mui/material/CircularProgress";
import "../CSS/Profile.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../store/auth";

export const Profile = () => {
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [showInput, setShowInput] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [updateError, setUpdateError] = useState(false);
  const [updateSuccMessage, setUpdateSuccMessage] = useState(null);
  const [updateErrorMessage, setUpdateErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false); // State to control loader

  const { user } = useAuth();
  // const profilePicUrl = user.userData.profilePic
  // console.log(profilePicUrl)

  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
  });

  useEffect(() => {
    if (user.data) {
      setFormData({
        name: user.data.name || "",
        mobile: user.data.phone || "",
        email: user.data.email || "",
      });
    }
  }, [user]);

  const handleEditSaveProfile = async () => {
    try {
      setLoading(true); // Activate loader on button click

      const token = localStorage.getItem("token");

      const dataToSend = {
        name: formData.name,
        phone: formData.mobile,
        email: formData.email,
      };

      const response = await fetch("http://localhost:5000/auth/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(dataToSend),
      });

      if (response.ok) {
        const updatedData = await response.json();
        setUpdateSuccMessage(updatedData.message);
        setShowInput(false);
        setIsEditMode(false);
        setUpdateSuccess(true);
        setUpdateError(false);
        setTimeout(() => {
          setUpdateSuccess(false);
          setUpdateSuccMessage(null);
        }, 3000);
      } else {
        const updatedData = await response.json();
        // throw new Error("Failed to update user profile");
        setUpdateErrorMessage(updatedData.message);
        setUpdateSuccess(false);
        setUpdateError(true);
        setTimeout(() => {
          setUpdateError(false);
          setUpdateErrorMessage(null);
        }, 3000);
      }
      if (response.status !== 200) {
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      }

      if (image) {
        const formData = new FormData();
        formData.append("profilePic", image, image.name);

        // Fetch the backend route for image upload
        const token = localStorage.getItem("token");

        const uploadResponse = await fetch(
          "http://localhost:5000/auth/upload",
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
            },
            body: formData,
          }
        );

        if (uploadResponse.ok) {
          const updatedImageData = await uploadResponse.json();
          // Handle success response for image upload if needed
        } else {
          const errorImageData = await uploadResponse.json();
          // Handle error response for image upload if needed
        }
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e) => {
    const uploadedImage = e.target.files[0];
    setImage(uploadedImage);
    setImageUrl(URL.createObjectURL(uploadedImage)); // Store URL representation
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log(`Updating ${name} with value: ${value}`); // Log the input changes
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div className="cover-img">
      <div className="alert-message">
        {updateSuccess && (
          <Alert
            severity="success"
            className="fadeIn"
            style={{ border: "1px solid green" }}
          >
            {updateSuccMessage}
          </Alert>
        )}
        {updateError && (
          <Alert
            severity="error"
            className="fadeIn"
            style={{ border: "1px solid #ec740b" }}
          >
            {updateErrorMessage}
          </Alert>
        )}
      </div>
      <div className="profile-img">
        <button
          className="edit-profile edit-button"
          onClick={() => {
            setShowInput(!showInput);
            setIsEditMode(!isEditMode);
            if (isEditMode) {
              handleEditSaveProfile();
            }
          }}
          disabled={loading} // Disable button when loader is active
        >
          {loading ? ( // Show loader when updating
            <CircularProgress size={24} />
          ) : isEditMode ? (
            "Save"
          ) : (
            "Edit Profile"
          )}
        </button>
        {image && (
          <img
            src={imageUrl}
            alt="Uploaded"
            className={`displayed-image ${isEditMode ? "inactive" : ""}`}
          />
        )}
        {showInput && (
          <>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="image-input"
              id="upload"
            />
            <label htmlFor="upload" className="edit-icon">
              <FontAwesomeIcon icon={faEdit} />
            </label>
          </>
        )}
      </div>
      <div className="customer-form-container">
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="form-groups">
            <div className="form-group-1">
              <div className="form-group">
                <label htmlFor="name">Name:</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  disabled={!isEditMode}
                />
              </div>
              <div className="form-group">
                <label htmlFor="mobile">Mobile:</label>
                <input
                  type="text"
                  id="mobile"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleInputChange}
                  required
                  disabled={!isEditMode}
                />
              </div>
            </div>
            <div className="form-group-1">
              <div className="form-group">
                <label htmlFor="email">Email:</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  disabled={!isEditMode}
                />
              </div>
            </div>
          </div>
        </form>
        <div>
          {/* <img
            src={user.userData.profilePic}
            alt="Description of the image"
          /> */}
        </div>
      </div>
    </div>
  );
};
