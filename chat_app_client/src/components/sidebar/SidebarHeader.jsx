import {
  AccountCircle,
  AddCircle,
  ExitToApp,
  GroupAdd,
  PersonAdd,
} from "@mui/icons-material";
import { IconButton } from "@mui/material";

const SidebarHeader = ({ setSlide }) => {
  // const [slide, setSlide] = useState(false);
  return (
    <div className="bg-slate-500 px-4 py-2 mb-2 flex rounded-md">
      <div className="flex items-center">
        <IconButton>
          <AccountCircle
            style={{ color: "white" }}
            onClick={() => setSlide(true)}
          />
        </IconButton>
        <div className="ml-9 flex items-center">
          <IconButton>
            <PersonAdd style={{ color: "white" }} />
          </IconButton>
          <IconButton>
            <GroupAdd style={{ color: "white" }} />
          </IconButton>
          <IconButton>
            <AddCircle style={{ color: "white" }} />
          </IconButton>
          <IconButton>
            <ExitToApp style={{ color: "white" }} />
          </IconButton>
        </div>
        {/* <SlidingPane
          closeIcon={<div>Some div containing custom close icon.</div>}
          isOpen={slide}
          title="Hey, it is optional pane title.  I can be React component too."
          from="left"
          width="200px"
          onRequestClose={() => setSlide(false)}
        >
          <div>And I am pane content on left.</div>
        </SlidingPane> */}
      </div>
    </div>
  );
};

export { SidebarHeader };
