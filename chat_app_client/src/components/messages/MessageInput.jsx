import { Field, Form, Formik } from "formik";
import SendIcon from "@mui/icons-material/Send";
import { useDispatch, useSelector } from "react-redux";
import {
  getMessages,
  sendMessage,
} from "../../redux/actions/sendMessageAction";

const MessageInput = () => {
  const loginUserToken = useSelector(
    (state) => state?.auth.authenticationToken
  );
  const selectedUser = useSelector((state) => state?.auth?.selectedUser);
  const messageData = useSelector((state) => state?.message);

  const dispatch = useDispatch();

  return (
    <Formik
      initialValues={{
        message: "",
      }}
      onSubmit={async (values, { resetForm }) => {
        if (values.message.length > 0) {
          dispatch(
            sendMessage({
              token: loginUserToken,
              message: values.message,
              id: selectedUser?._id,
            })
          );
        }
        dispatch(getMessages({ token: loginUserToken, id: selectedUser?._id }));
        resetForm();
      }}
    >
      {() => (
        <Form className="px-4 my-3">
          <div className="w-full relative">
            <Field
              type="text"
              className="border text-sm rounded-lg block w-full p-2.5  bg-gray-700 border-gray-600 text-white"
              placeholder="Send a message"
              name="message"
            />
            <button
              type="submit"
              className="absolute inset-y-0 end-0 flex items-center pe-3"
            >
              {messageData.loading ? (
                <div className="loading loading-spinner"></div>
              ) : (
                <SendIcon style={{ color: "white" }} />
              )}
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};
export default MessageInput;
