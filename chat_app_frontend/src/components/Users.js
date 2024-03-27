import "./style.css";
import axios from "axios";
import { IconButton } from "@mui/material";
import logo from "../images/live-chat.png";
import { Search } from "@mui/icons-material";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const url = "http://192.168.1.4:4001/api";

export const Users = () => {
  const lightTheme = useSelector((state) => state.themeKey);
  const [refresh, setRefresh] = useState(true);
  const [users, setUsers] = useState([]);
  const tokenRegister = JSON.parse(localStorage.getItem("tokenRegister"));
  const navigate = useNavigate();
  if (!tokenRegister) {
    navigate(-1);
  }
  useEffect(() => {
    const config = {
      headers: {
        Authorization: `Bearer ${tokenRegister}`,
      },
    };
    // axios.get(`${url}/user/fetchUsers`, config).then((data) => {
    //   console.log("data.data", data.data.data[0]);
    //   setUsers(data?.data?.data);
    // });
  }, [refresh]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0 }}
        transition={{
          ease: "anticipate",
          duration: "0.3",
        }}
        className="list-container"
      >
        <div className="ug-header">
          <img
            src={logo}
            alt="Logo"
            style={{ height: "2rem", width: "2rem", marginLeft: "10px" }}
          />
          <p className="ug-title">Online Users</p>
        </div>
        <div className="sb-search">
          <IconButton>
            <Search />
          </IconButton>
          <input
            placeholder="Search"
            className={"search-box" + (lightTheme ? "" : " dark")}
          />
        </div>
        <div className="ug-list">
          {users.map((user, index) => {
            return (
              <motion.div
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                className={"list-tem" + (lightTheme ? "" : " dark")}
                key={index}
                onClick={async () => {
                  console.log("Creating chat with ", user.name);
                  const config = {
                    headers: { Authorization: `Bearer ${tokenRegister}` },
                  };
                  await axios.post(
                    `${url}/chat/accessChats`,
                    {
                      userId: user._id,
                    },
                    config
                  );
                }}
              >
                <p className={"con-icon" + (lightTheme ? "" : " dark")}>
                  {user.name.charAt(0)}
                </p>
                <p className={"con-title" + (lightTheme ? "" : " dark")}>
                  {user.name}
                </p>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
