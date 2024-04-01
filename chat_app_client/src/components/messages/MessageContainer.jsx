import { TiMessages } from "react-icons/ti";
import MessageInput from "./MessageInput";
import Messages from "./Messages";
import { useSelector } from "react-redux";
import CallIcon from "@mui/icons-material/Call";
import VideoCallIcon from "@mui/icons-material/VideoCall";
import { IconButton } from "@mui/material";

const MessageContainer = () => {
  const selectedUserData = useSelector((state) => state?.auth?.selectedUser);

  return (
    <div className="md:min-w-[450px] flex flex-col">
      {Object.keys(selectedUserData || {})?.length === 0 ? (
        <NoChatSelected />
      ) : (
        <>
          <div className="bg-slate-500 px-4 py-2 mb-2 mx-1 my-1 flex rounded-md">
            <span className="label-text">
              <img
                className="w-10 rounded-full"
                src={selectedUserData.profile_pic}
                alt="user avatar"
              />
            </span>
            <span className="text-white font-bold m-2">
              {selectedUserData?.fullName || ""}
            </span>
            <span style={{ position: "absolute", top: 10, right: 55 }}>
              <IconButton>
                <CallIcon style={{ color: "white" }} />
              </IconButton>
            </span>
            <span style={{ position: "absolute", top: 10, right: 16 }}>
              <IconButton>
                <VideoCallIcon style={{ color: "white" }} />
              </IconButton>
            </span>
          </div>

          <Messages />
          <MessageInput />
        </>
      )}
    </div>
  );
};
export default MessageContainer;

const NoChatSelected = () => {
  const userSignUpData = useSelector((state) => state.register.userInfo);
  const userLoginData = useSelector((state) => state.auth.userInfo);

  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="px-4 text-center sm:text-lg md:text-xl text-gray-200 font-semibold flex flex-col items-center gap-2">
        <p>
          Welcome 👋 {userSignUpData?.fullName} {userLoginData?.fullName}❄
        </p>
        <p>Select a chat to start messaging</p>
        <TiMessages className="text-3xl md:text-6xl text-center" />
      </div>
    </div>
  );
};
