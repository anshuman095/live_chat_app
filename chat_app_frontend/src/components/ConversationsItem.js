import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export const ConversationsItem = ({ conversations }) => {
  console.log("conversations", conversations);
  const lightTheme = useSelector((state) => state.themeKey);

  const navigate = useNavigate();
  return (
    // <div
    //   className={"conversations-container" + (lightTheme ? "" : " dark")}
    //   onClick={() => navigate("chat")}
    // >
    <div className="conversations-container" onClick={() => navigate("chat")}>
      <p className="con-icon">{conversations?.name[0]}</p>
      <p className="con-title">{conversations?.name}</p>
      <p className="con-lastMessage">{conversations?.lastMessage}</p>
      <p className="con-timeStamp">{conversations?.timeStamp}</p>
    </div>
  );
};
