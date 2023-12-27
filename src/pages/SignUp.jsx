import { useState } from "react";
import "../CSS/SignUp.css";
import signupImage from "../Images/signupImg.png";
import { useAuth } from "../store/auth";
import Alert from "@mui/material/Alert";
import { useNavigate } from "react-router-dom";

export const SignUp = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
  });
  const [signupSuccess, setSignupSuccess] = useState(false);
  const [signupError, setSignupError] = useState(false);
  const [signupSuccMessage, setSignupSuccMessage] = useState(null);
  const [signupErrorMessage, setSignupErrorMessage] = useState(null);
  const navigate = useNavigate();

  const { storeDataInLS } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:5000/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (res.status === 400) {
        const loginErrorData = await res.json();
        // console.log(resData);
        setSignupError(true);
        setTimeout(() => {
          setSignupError(false);
        }, 3000);
        setSignupErrorMessage(loginErrorData.mess || loginErrorData.message);

        // alert(errorData.mess || errorData.message);
      } else if (res.ok) {
        const resData = await res.json();

        // alert("User registered successfully");
        setSignupSuccess(true);
        setTimeout(() => {
          setSignupSuccess(false);
        }, 3000);
        setTimeout(() => {
          navigate("/login");
        }, 1000);
        console.log("data from server", resData);
        setSignupSuccMessage(resData.message);
        storeDataInLS(resData.token);
      } else if (res.status === 500) {
        alert("Registration failed");
      } else {
        // Handle other status codes if needed
        alert("Unexpected error occurred");
      }
    } catch (error) {
      console.error("Error during registration:", error);
      // Handle other errors such as network issues or exceptions here
      alert("Error during registration");
    }
  };

  return (
    <>
      <div className="alert-message">
        {signupSuccess && (
          <Alert
            severity="success"
            className="fadeIn"
            style={{ border: "1px solid green" }}
          >
            {signupSuccMessage}
          </Alert>
        )}
        {signupError && (
          <Alert
            severity="error"
            className="fadeIn"
            style={{ border: "1px solid #ec740b" }}
          >
            {signupErrorMessage}
          </Alert>
        )}
      </div>
      <div className="signup">
        <div className="signup-main">
          <div className="signupRight">
            <img src={signupImage}></img>
          </div>
          <div className="signupLeft">
            <div className="signup-top">
              <div className="signup-header">
                <h4>Sign up </h4>
              </div>
              <div className="signupClose">
                <span class="material-symbols-outlined">close</span>
              </div>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="field">
              <i class="fa-solid fa-building"></i>
                <input
                  type="text"
                  id="name"
                  placeholder="your name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="field">
              <i class="fa-solid fa-mobile"></i>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  placeholder="your phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="field">
              <i class="fa-regular fa-envelope"></i>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="your email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="field">
              <i class="fa-solid fa-lock"></i>
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="set a password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
              <button type="submit" className="signupBtn">
                Create
              </button>
              <p className="countinue-with">or continue with</p>
              <div className="signup-options">
                <p>
                  <i class="fa-brands fa-google"></i>
                </p>
                <p>
                  <i class="fa-brands fa-facebook"></i>
                </p>
                <p>
                  <i class="fa-brands fa-twitter"></i>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
