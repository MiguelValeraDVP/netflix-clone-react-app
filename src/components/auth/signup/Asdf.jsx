import React, { useEffect, useState } from "react";
import BackgroundImage from "../../netflix/header/BackgroundImage";
import NavbarLoginSignup from "../../netflix/header/Header";
import "../../../index.css";
import "./signup.css";
import axios from "axios";
import { notifyFailureToast } from "../../../utils/generalConsts";
import { ToastContainer } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
//import { setUser } from "../../../store";
import { useNavigate } from "react-router-dom";
import { setUser } from "../../../store";

const Asdf = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [formValues, setFormValues] = useState({ email: "", password: "" });
  const user = useSelector((state) => state.netflix.user);

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, []);

  const handleSignup = async () => {
    try {
      const { email, password } = formValues;
      const response = await axios.post(
        "https://netfliix-clone-backend-i87z8ckkj-miguelvaleradvp.vercel.app/api/user/signup",
        {
          email,
          password,
        }
      );
      const user = response.data.userData;
      dispatch(setUser(user));
      localStorage.setItem("user", JSON.stringify(user));

      navigate("/");
    } catch {
      notifyFailureToast();
    }
  };

  return (
    <section>
      <BackgroundImage />
      <div className="content">
        <NavbarLoginSignup login />
        <div className="body flex column a-center j-center">
          <div className="text flex column">
            <h1>Unlimited Movies, TV shows and more</h1>
            <h4>Watch anywhere and cancel with one click</h4>
            <h6>
              Ready to watch? Enter your email to create or start membership.
            </h6>
          </div>
          <form
            style={{
              gridTemplateColumns: `${
                showPassword && window.innerWidth > 768 ? "1fr 1fr" : "2fr 1fr"
              }`,
            }}
            className="form"
          >
            <input
              type="email"
              placeholder="Email address"
              name="email"
              id="email"
              value={formValues.email}
              onChange={(e) =>
                setFormValues({
                  ...formValues,
                  [e.target.name]: e.target.value,
                })
              }
            />
            {!showPassword ? (
              <button onClick={() => setShowPassword(true)} type="button">
                Get started
              </button>
            ) : (
              <>
                <input
                  type="password"
                  placeholder="Password"
                  name="password"
                  id="password"
                  autoComplete="true"
                  value={formValues.password}
                  onChange={(e) =>
                    setFormValues({
                      ...formValues,
                      [e.target.name]: e.target.value,
                    })
                  }
                />
                <div></div>
                <div className="button-wrapper">
                  <button type="button" onClick={handleSignup}>
                    Sign up
                  </button>
                </div>
              </>
            )}
          </form>
          <ToastContainer />
        </div>
      </div>
    </section>
  );
};

export default Asdf;
