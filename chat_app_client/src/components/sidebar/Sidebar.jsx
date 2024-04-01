import { useState } from "react";
import Conversations from "./Conversations";
import LogoutButton from "./LogoutButton";
import SearchInput from "./SearchInput";
import { SidebarHeader } from "./SidebarHeader";
import SlidingPane from "react-sliding-pane";
import "../../index.css";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useSelector } from "react-redux";
import { Field, Form, Formik } from "formik";

const Sidebar = () => {
  const loginUserData = useSelector((state) => state?.auth.userInfo);
  const [slide, setSlide] = useState(false);

  return (
    <>
      <div className="border-r border-slate-500 p-1 flex flex-col">
        <SlidingPane
          className="bg-blue-900 sidebar-pane"
          overlayClassName="sidebar-overlay"
          closeIcon={
            <div>
              <ArrowBackIcon />
              <span className="title">Profile</span>
            </div>
          }
          isOpen={slide}
          // title={"Profile"}
          from="left"
          width="280px"
          onRequestClose={() => setSlide(false)}
        >
          <div>
            <div className="profile-pic-container">
              <img
                src={loginUserData?.profile_pic}
                alt="user profile pic"
                style={{
                  width: "100px",
                  height: "100px",
                  borderRadius: "50%",
                  objectFit: "cover",
                  margin: "0 auto",
                }}
              />
            </div>
            <Formik
              initialValues={{
                fullName: "",
                bio: "",
              }}
              onSubmit={(values) => {
                console.log(values);
              }}
            >
              {() => (
                <Form>
                  <div>
                    <label className="text-white">Name</label>
                    <div>
                      <Field
                        type="text"
                        placeholder={`${loginUserData?.fullName}`}
                        name="fullName"
                      />
                    </div>
                  </div>
                  <div>
                    <label>About</label>
                    <div>
                      <input type="text" placeholder="About" />
                    </div>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </SlidingPane>
        <SidebarHeader setSlide={setSlide} />
        <SearchInput />
        <div className="divider px-3"></div>
        <Conversations />
        <LogoutButton />
      </div>
    </>
  );
};
export default Sidebar;
