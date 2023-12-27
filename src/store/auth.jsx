import React, { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));
  const [user, setUser] = useState("");

  const storeDataInLS = (serverToken) => {
    localStorage.setItem("token", serverToken);
    setIsLoggedIn(true);
  };

  const LogoutUser = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false); 
  };

  const userAuthentication = async () => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        const response = await fetch("http://localhost:5000/auth/account", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
    
        if (response.ok) {
          const userData = await response.json();

          // Fetch profile picture
          const profilePicResponse = await fetch("http://localhost:5000/auth/profilePic", {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (profilePicResponse.ok) {
            const profilePicBlob = await profilePicResponse.blob();
            userData.profilePic = URL.createObjectURL(profilePicBlob);
            console.log("img url", user.userData.profilePic)
          }

          setUser(userData);
        }
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const updateUserData = async (updatedData) => {
  try {
    const token = localStorage.getItem("token");
    if (token) {
      const response = await fetch("http://localhost:5000/auth/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedData),
      });

      if (response.ok) {
        // Optionally, update the local user state or perform actions upon successful update
        // For example: setUser(updatedUserData);
        alert("User data updated successfully!"); // Alert for successful update
      } else {
        throw new Error("Failed to update user data");
      }
    }
  } catch (error) {
    console.error("Error updating user data:", error);
    throw error;
  }
};

useEffect(() => {
  userAuthentication();
}, []);

return (
  <AuthContext.Provider value={{ isLoggedIn, storeDataInLS, LogoutUser, user, updateUserData }}>
    {children}
  </AuthContext.Provider>
);
};

export const useAuth = () => {
const authContextValue = useContext(AuthContext);
if (!authContextValue) {
  throw new Error("useAuth used outside of provider");
}
return authContextValue;
};