import "./App.css";
import { Route, Routes } from "react-router-dom";
import { Login } from "./components/Login";
import { MainContainer } from "./components/MainContainer";
import Welcome from "./components/Welcome";
import { ChatArea } from "./components/ChatArea";
import { Users } from "./components/Users";
import { Groups } from "./components/Groups";
import { CreateGroups } from "./components/CreateGroups";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="app" element={<MainContainer />}>
          <Route path="welcome" element={<Welcome />}></Route>
          <Route path="chat/:_id" element={<ChatArea />}></Route>
          <Route path="users" element={<Users />}></Route>
          <Route path="groups" element={<Groups />}></Route>
          <Route path="create-groups" element={<CreateGroups />}></Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
