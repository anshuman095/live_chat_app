import "./style.css";
import { Backdrop, Button, CircularProgress, TextField } from "@mui/material";
import logo from "../images/live-chat.png";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Formik } from "formik";
import { userLogin } from "../redux/actions/authAction";
import { registerUser } from "../redux/actions/registerAction";

export const Login = () => {
  const dispatch = useDispatch();

  const [showLogin, setShowLogin] = useState(true);

  const navigate = useNavigate();

  console.log("showLogin", showLogin);
  return (
    <Formik
      initialValues={{ name: "", password: "", email: "" }}
      onSubmit={(values) => {
        if (showLogin) {
          console.log("login enter");
          dispatch(userLogin(values));
          navigate("/app/welcome");
        } else {
          console.log("register enter");
          dispatch(registerUser(values));
          navigate("/app/welcome");
        }
      }}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
      }) => (
        <>
          {
            <>
              {/* <Backdrop
                sx={{
                  color: "#fff",
                  zIndex: (theme) => theme.zIndex.drawer + 1,
                }}
                open={loading}
              >
                <CircularProgress color="secondary" />
              </Backdrop> */}
              <form onSubmit={handleSubmit}>
                <div className="login-container">
                  <div className="image-container">
                    <img src={logo} alt="Logo" className="welcome-logo" />
                  </div>
                  {showLogin && (
                    <div className="login-box">
                      <p className="login-text">Login to your Account</p>
                      <TextField
                        id="standard-basic"
                        label="Enter User Name"
                        variant="outlined"
                        color="secondary"
                        type="name"
                        name="name"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.name}
                      />
                      <TextField
                        id="outlined-password-input"
                        label="Password"
                        type="password"
                        name="password"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.password}
                        autoComplete="current-password"
                        color="secondary"
                      />
                      <Button
                        variant="outlined"
                        color="secondary"
                        type="submit"
                      >
                        Login
                      </Button>
                      <p>
                        Don't have an account ?{" "}
                        <span
                          className="hyper"
                          onClick={() => setShowLogin(false)}
                        >
                          Sign Up
                        </span>
                      </p>
                      {/* {loginStatus ? (
                        <Toaster
                          key={loginStatus.key}
                          message={loginStatus.msg}
                        />
                      ) : null} */}
                    </div>
                  )}
                  {!showLogin && (
                    <div className="login-box">
                      <p className="login-text">Create your Account</p>
                      <TextField
                        id="standard-basic"
                        label="Enter User Name"
                        variant="outlined"
                        color="secondary"
                        name="name"
                        onBlur={handleBlur}
                        value={values.name}
                        onChange={handleChange}
                        helperText=""
                      />
                      <TextField
                        id="standard-basic"
                        label="Enter Email Address"
                        variant="outlined"
                        color="secondary"
                        name="email"
                        onBlur={handleBlur}
                        value={values.email}
                        onChange={handleChange}
                        helperText=""
                      />
                      <TextField
                        id="outlined-paasword-input"
                        label="Password"
                        type="password"
                        autoComplete="current-password"
                        color="secondary"
                        name="password"
                        onBlur={handleBlur}
                        value={values.password}
                        onChange={handleChange}
                      />
                      <Button
                        variant="outlined"
                        color="secondary"
                        type="submit"
                      >
                        Sign Up
                      </Button>
                      <p>
                        Alrady have an Account ?
                        <span
                          className="hyper"
                          onClick={() => setShowLogin((state) => !state)}
                        >
                          Login
                        </span>
                      </p>
                      {/* {signInStatus ? (
                        <Toaster
                          key={signInStatus.key}
                          message={signInStatus.msg}
                        />
                      ) : null} */}
                    </div>
                  )}
                </div>
              </form>
            </>
          }
        </>
      )}
    </Formik>
  );
};
