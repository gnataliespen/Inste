import React from "react";
import { Menu } from "semantic-ui-react";

import UserPanel from "./UserPanel";
import Channels from "./Channels";

const SidePanel = ({ user, setCurrentChannel }) => {
  return (
    <Menu
      size="large"
      inverted
      fixed="left"
      vertical
      style={{ background: "#4c3c4c" }}
    >
      <UserPanel user={user} />
      <Channels setCurrentChannel={setCurrentChannel} user={user} />
    </Menu>
  );
};

export default SidePanel;
