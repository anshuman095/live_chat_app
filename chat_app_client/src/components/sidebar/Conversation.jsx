import { useDispatch, useSelector } from "react-redux";
import { setSelectedUserInfo } from "../../redux/features/auth/authSlice";
import { getMessages } from "../../redux/actions/sendMessageAction";
import { useEffect, useState } from "react";
import { socketConnection } from "../../redux/actions/socketAction";
import io from "socket.io-client";

const Conversation = ({ conversation, emoji, lastIndex }) => {
  const [data, setData] = useState(false);
  const selectedUserData = useSelector((state) => state?.auth?.selectedUser);
  const loginUserToken = useSelector(
    (state) => state?.auth?.authenticationToken
  );
  const dispatch = useDispatch();
  useEffect(() => {
    if (data && Object.keys(selectedUserData || {}).length > 0) {
      dispatch(
        getMessages({ token: loginUserToken, id: selectedUserData?._id })
      );
    }
    setInterval(() => {
      setData(false);
    }, 300);
  }, [selectedUserData, data]);

  // useEffect(() => {
  //   dispatch(socketConnection());
  // }, [dispatch]);
  useEffect(() => {
    const handleSocketConnection = async () => {
      const socket = await dispatch(socketConnection());
      console.log("Socket:", socket); // Check if the socket object is present
    };

    if (loginUserToken) {
      handleSocketConnection();
    }
  }, [loginUserToken, dispatch]);

  function handleOnClick(userData) {
    console.log("ahahhahahahhahahahha");
    dispatch(setSelectedUserInfo(userData));
    setData(true);
    // dispatch(socketConnection());
  }
  return (
    <>
      <div
        className="flex gap-2 items-center hover:bg-sky-500 rounded p-2 py-1 cursor-pointer"
        onClick={() => handleOnClick(conversation)}
      >
        <div className="avatar online">
          <div className="w-12 rounded-full">
            <img src={conversation.profile_pic} alt="user avatar" />
          </div>
        </div>

        <div className="flex flex-col flex-1">
          <div className="flex gap-3 justify-between">
            <p className="font-bold text-gray-200">{conversation.fullName}</p>
            <span className="text-xl">{emoji}</span>
          </div>
        </div>
      </div>

      {!lastIndex && <div className="divider my-0 py-0 h-1" />}
    </>
  );
};
export default Conversation;
