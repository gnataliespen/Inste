import React from "react";
import { Menu } from "semantic-ui-react";

import UserPanel from "./UserPanel";
import Channels from "./Channels";

const SidePanel = ({ currentUser, setCurrentChannel, logout }) => {
  return (
    <Menu
      size="large"
      inverted
      fixed="left"
      vertical
      style={{ background: "#4c3c4c" }}
    >
      <UserPanel currentUser={currentUser} logout={logout} />
      <Channels
        setCurrentChannel={setCurrentChannel}
        currentUser={currentUser}
      />
    </Menu>
  );
};

export default SidePanel;
