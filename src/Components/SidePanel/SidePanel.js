import React from "react";
import { Menu } from "semantic-ui-react";

import UserPanel from "./UserPanel";

const SidePanel = () => {
  return (
    <Menu
      size="large"
      inverted
      fixed="left"
      vertical
      style={{ background: "#4c3c4c" }}
    >
      <UserPanel />
    </Menu>
  );
};

export default SidePanel;
