import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import BackgroundImage from "../../netflix/header/BackgroundImage";
import NavbarLoginSignup from "../../netflix/header/Header";
import "./login.css";
import "../../../index.css";
import axios from "axios";
import { useNavigate } from "react-router";
import { ToastContainer } from "react-toastify";
import { setUser } from "../../../store/index";
import "react-toastify/dist/ReactToastify.css";
import { notifyFailureToast } from "../../../utils/generalConsts";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.netflix.user);

  const [formValues, setFormValues] = useState({ email: "", password: "" });
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user]);
  const handleLogin = async (e) => {
    try {
      e.preventDefault();
      const { email, password } = formValues;
      const response = await axios.post(
        "https://netfliix-clone-backend-i87z8ckkj-miguelvaleradvp.vercel.app/api/user/login",
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
        <NavbarLoginSignup />
        <div className="form-container flex column a-center j-center">
          <form
            className="form flex column a-center j-center"
            onSubmit={handleLogin}
          >
            <div className="title">
              <h3 style={{ textAlign: "center", marginBottom: "1rem" }}>
                Login
              </h3>
              <div className="container flex column">
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

                <input
                  type="password"
                  placeholder="Password"
                  name="password"
                  id="password"
                  value={formValues.password}
                  onChange={(e) =>
                    setFormValues({
                      ...formValues,
                      [e.target.name]: e.target.value,
                    })
                  }
                />
                <button style={{ marginTop: "1rem" }} type="submit">
                  Login
                </button>
              </div>
            </div>
          </form>
          <ToastContainer />
        </div>
      </div>
    </section>
  );
};

export default Login;
