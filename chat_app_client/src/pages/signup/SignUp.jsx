import { Link, useNavigate } from "react-router-dom";
import GenderCheckbox from "./GenderCheckbox";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../redux/actions/registerAction";
import toast from "react-hot-toast";
import {
  resetUserInfo,
  setSelectedUserInfo,
} from "../../redux/features/auth/authSlice";
import { getAllUsers } from "../../redux/actions/authAction";

const SignUp = () => {
  const signUpUserData = useSelector((state) => state.register);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
      <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
        <h1 className="text-3xl font-semibold text-center text-blue-500">
          Buzz
        </h1>

        <Formik
          initialValues={{
            username: "",
            fullName: "",
            email: "",
            password: "",
            gender: "",
          }}
          validate={(values) => {
            const errors = {};
            if (!values.username) {
              errors.username = "Required!";
            }
            if (!values.fullName) {
              errors.fullName = "Required!";
            }
            if (!values.email) {
              errors.email = "Required!";
            }
            if (!values.password) {
              errors.password = "Required!";
            }
            if (!values.gender) {
              errors.password = "Required!";
            }
            return errors;
          }}
          onSubmit={async (values, { setSubmitting }) => {
            try {
              dispatch(resetUserInfo());
              const data = await dispatch(registerUser(values));
              if (data.payload.success === true) {
                const token = data.payload.token;
                await dispatch(getAllUsers(token));
                await dispatch(setSelectedUserInfo(null));
                toast.success("Registration successful!");
                navigate("/");
              } else {
                toast.error(data.payload || "Registration failed!");
              }
            } catch (error) {
              toast.error(error || "Registration failed!");
            } finally {
              setSubmitting(false);
            }
          }}
        >
          {() => (
            <Form>
              <div>
                <label className="label p-2 ">
                  <span className="text-base label-text text-gray-200">
                    Username
                  </span>
                </label>
                <Field
                  type="text"
                  placeholder="Enter username"
                  className="w-full input input-bordered h-10"
                  name="username"
                />
                <ErrorMessage
                  className="text-red-700"
                  name="username"
                  component="div"
                />
              </div>

              <div>
                <label className="label p-2">
                  <span className="text-base label-text text-gray-200">
                    Full Name
                  </span>
                </label>
                <Field
                  type="text"
                  placeholder="John Doe"
                  className="w-full input input-bordered  h-10"
                  name="fullName"
                />
                <ErrorMessage
                  className="text-red-700"
                  name="fullName"
                  component="div"
                />
              </div>

              <div>
                <label className="label p-2">
                  <span className="text-base label-text text-gray-200">
                    Email
                  </span>
                </label>
                <Field
                  type="email"
                  placeholder="johndoe@gmail.com"
                  className="w-full input input-bordered  h-10"
                  name="email"
                />
                <ErrorMessage
                  className="text-red-700"
                  name="email"
                  component="div"
                />
              </div>

              <div>
                <label className="label">
                  <span className="text-base label-text text-gray-200">
                    Password
                  </span>
                </label>
                <Field
                  type="password"
                  placeholder="Enter Password"
                  className="w-full input input-bordered h-10"
                  name="password"
                />
                <ErrorMessage
                  className="text-red-700"
                  name="password"
                  component="div"
                />
              </div>

              <GenderCheckbox />

              <Link
                className="text-sm text-gray-200 hover:underline hover:text-blue-600 mt-2 inline-block"
                to="/login"
              >
                Already have an account?
              </Link>

              <div>
                <button
                  className="btn btn-block btn-sm mt-2 border border-slate-700"
                  type="submit"
                >
                  {signUpUserData.loading ? (
                    <span className="loading loading-spinner"></span>
                  ) : (
                    "Sign Up"
                  )}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};
export default SignUp;
