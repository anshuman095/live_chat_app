import { useSelector } from "react-redux";
import logo from "../images/live-chat.png";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Welcome = () => {
  const lightTheme = useSelector((state) => state.themeKey);
  const userData = JSON.parse(localStorage?.getItem("userData"));
  const navigate = useNavigate();
  if (!userData) {
    navigate("/");
  }
  return (
    <div className={"welcome-container" + (lightTheme ? "" : " dark")}>
      <motion.img
        drag
        whileTap={{ scale: 1.05, rotate: 360 }}
        src={logo}
        alt="Logo"
        className="welcome-logo"
      />
      <b>Hi, {userData?.name} ✋</b>
      {/* <img src={logo} alt="Logo" className="welcome-logo" /> */}
      <p>View and text directly to people present in the chat Rooms.</p>
    </div>
  );
};

export default Welcome;
