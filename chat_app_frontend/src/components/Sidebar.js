import "./style.css";
import {
  AccountCircle,
  AddCircle,
  GroupAdd,
  Nightlight,
  PersonAdd,
  Search,
  LightMode,
  ExitToApp,
} from "@mui/icons-material";
import { IconButton } from "@mui/material";
// import { ConversationsItem } from "./ConversationsItem";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../redux/features/themeSlice";
import axios from "axios";

const url = "http://192.168.1.4:4001/api";

export const Sidebar = () => {
  // const [lightTheme, setLightTheme] = useState(true);
  const lightTheme = useSelector((state) => state?.themeKey);
  const [conversations, setConversations] = useState([]);
  const tokenRegister = JSON.parse(localStorage.getItem("tokenRegister"));
  console.log("tokenRegister in sidebar", tokenRegister);

  const dispatch = useDispatch();

  useEffect(() => {
    const config = {
      headers: {
        Authorization: `Bearer ${tokenRegister}`,
      },
    };
    axios.get(`${url}/chat/fetchChats`, config).then((response) => {
      console.log("Data refresh in sidebar ", response.data[0]);
      setConversations(response.data);
    });
  }, []);

  const navigate = useNavigate();

  if (!tokenRegister) {
    navigate("/");
  }

  return (
    <div className="sidebar-container">
      <div className={"sb-header" + (lightTheme ? "" : " dark")}>
        <div>
          <IconButton
            onClick={() => {
              navigate("/app/welcome");
            }}
          >
            <AccountCircle className={"icon" + (lightTheme ? "" : " dark")} />
          </IconButton>
        </div>
        <div>
          <IconButton onClick={() => navigate("users")}>
            <PersonAdd className={"icon" + (lightTheme ? "" : " dark")} />
          </IconButton>
          <IconButton onClick={() => navigate("groups")}>
            <GroupAdd className={"icon" + (lightTheme ? "" : " dark")} />
          </IconButton>
          <IconButton onClick={() => navigate("create-groups")}>
            <AddCircle className={"icon" + (lightTheme ? "" : " dark")} />
          </IconButton>

          {/* onClick={() => setLightTheme(!lightTheme)} */}

          <IconButton
            onClick={() => {
              dispatch(toggleTheme());
            }}
          >
            {lightTheme && (
              <Nightlight className={"icon" + (lightTheme ? "" : " dark")} />
            )}
            {!lightTheme && (
              <LightMode className={"icon" + (lightTheme ? "" : " dark")} />
            )}
          </IconButton>
          <IconButton
            onClick={() => {
              localStorage.removeItem("userData");
              localStorage.removeItem("tokenRegister");
              navigate("/");
            }}
          >
            <ExitToApp className={"icon" + (lightTheme ? "" : " dark")} />
          </IconButton>
        </div>
      </div>
      <div className={"sb-search" + (lightTheme ? "" : " dark")}>
        <IconButton className={"icon" + (lightTheme ? "" : " dark")}>
          <Search />
        </IconButton>
        <input
          placeholder="Search"
          className={"search-box" + (lightTheme ? "" : " dark")}
        />
      </div>
      <div className={"sb-conversations" + (lightTheme ? "" : " dark")}>
        {conversations.map((item, index) => {
          if (item.users.length === 1) {
            return <div key={index}></div>;
          }
          if (item.latestMessage === undefined) {
            console.log("No Latest Message with ", item.users[1]);
            return (
              <div
                key={index}
                onClick={() => {
                  console.log("Refresh fired from sidebar");
                  // dispatch(refreshSidebarFun());
                  // setRefresh(!refresh);
                }}
              >
                <div
                  key={index}
                  className="conversation-container"
                  onClick={() => {
                    navigate("chat/" + item._id + "&" + item.users[1].name);
                  }}
                  // dispatch change to refresh so as to update chatArea
                >
                  <p className={"con-icon" + (lightTheme ? "" : " dark")}>
                    {item.users[1].name[0]}
                  </p>
                  <p className={"con-title" + (lightTheme ? "" : " dark")}>
                    {item.users[1].name}
                  </p>

                  <p className="con-lastMessage">
                    No previous Messages, click here to start a new chat
                  </p>
                </div>
              </div>
            );
          } else {
            return (
              <div
                key={index}
                className="conversation-container"
                onClick={() => {
                  navigate("chat/" + item._id + "&" + item.users[1].name);
                }}
              >
                <p className={"con-icon" + (lightTheme ? "" : " dark")}>
                  {item.users[1].name[0]}
                </p>
                <p className={"con-title" + (lightTheme ? "" : " dark")}>
                  {item.users[1].name}
                </p>

                <p className="con-lastMessage">{item.latestMessage.content}</p>
              </div>
            );
          }
          // return <ConversationsItem conversations={item} key={item.name} />;
        })}
      </div>
    </div>
  );
};
