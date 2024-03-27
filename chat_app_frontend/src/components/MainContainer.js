import "./style.css";
import { Sidebar } from "./Sidebar";
import { Outlet } from "react-router-dom";
import { ChatArea } from "./ChatArea";
// import { Users } from "./Users";
// import { Groups } from "./Groups";
// import Welcome from "./Welcome";
// import { CreateGroups } from "./CreateGroups";
// import { WorkArea } from "./WorkArea";

export const MainContainer = () => {
  return (
    <div className="main-container">
      <Sidebar />
      <Outlet />
      {/* <Welcome /> */}
      {/* <CreateGroups /> */}
      {/* <ChatArea props={conversations[0]} /> */}
      {/* <Users /> */}
      {/* <Groups /> */}
    </div>
  );
};

/* <WorkArea /> */
