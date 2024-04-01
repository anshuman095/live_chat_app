import { useSelector } from "react-redux";
import { extractTime } from "../../utils/extractTime";

const Message = ({ message }) => {
  const loginUserData = useSelector((state) => state?.auth?.userInfo);
  const fromMe = message.senderId === loginUserData._id;
  const selectedUserData = useSelector((state) => state?.auth?.selectedUser);

  const formattedTime = extractTime(message.createdAt);
  const chatClassName = fromMe ? "chat-end" : "chat-start";
  const profilePic = fromMe
    ? loginUserData.profile_pic
    : selectedUserData?.profile_pic;
  const bubbleBgColor = fromMe ? "bg-blue-500" : "";

  // const shakeClass = message.shouldShake ? "shake" : "";

  return (
    <div className={`chat ${chatClassName}`}>
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img alt="Tailwind CSS chat bubble component" src={profilePic} />
        </div>
      </div>
      <div className={`chat-bubble text-white ${bubbleBgColor} pb-2`}>
        {message.message}
      </div>
      <div className="chat-footer opacity-100 text-xs text-white flex gap-1 items-center">
        {formattedTime}
      </div>
    </div>
  );
};
export default Message;
