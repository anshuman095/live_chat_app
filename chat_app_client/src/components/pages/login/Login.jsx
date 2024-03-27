import { ErrorMessage, Field, Form, Formik } from "formik";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
      <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
        <h1 className="text-3xl font-semibold text-center text-blue-500">
          Buzz
        </h1>

        <Formik
          initialValues={{
            username: "",
            password: "",
          }}
          validate={(values) => {
            const errors = {};
            if (!values.username) {
              errors.username = "Required!";
            }
            if (!values.password) {
              errors.password = "Required!";
            }
            return errors;
          }}
          onSubmit={(values) => {
            console.log("values", values);
          }}
        >
          {() => (
            <Form>
              <div>
                <label className="label p-2">
                  <span className="text-base label-text">Username</span>
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
                <label className="label">
                  <span className="text-base label-text">Password</span>
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
              <Link
                to="/signup"
                className="text-sm  hover:underline hover:text-blue-600 mt-2 inline-block"
              >
                {"Don't"} have an account?
              </Link>

              <div>
                <button className="btn btn-block btn-sm mt-2" type="submit">
                  Login
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};
export default Login;
