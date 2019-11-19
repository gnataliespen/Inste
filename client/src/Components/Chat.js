import React from "react";
import { Grid } from "semantic-ui-react";
import { connect } from "react-redux";
import { setCurrentChannel } from "../redux/actions/index";

import ColorPanel from "./ColorPanel/ColorPanel";
import SidePanel from "./SidePanel/SidePanel";
import Messages from "./Messages/Messages";
import MetaPanel from "./MetaPanel/MetaPanel";

const Chat = ({ currentUser, setCurrentChannel, currentChannel }) => {
  return (
    <Grid columns="equal" className="app">
      <ColorPanel />
      <SidePanel
        setCurrentChannel={setCurrentChannel}
        currentUser={currentUser}
      />

      <Grid.Column style={{ marginLeft: 320 }}>
        <Messages currentChannel={currentChannel} currentUser={currentUser} />
      </Grid.Column>

      <Grid.Column width={4}>
        <MetaPanel />
      </Grid.Column>
    </Grid>
  );
};

const mapStateToProps = state => ({
  currentUser: state.user.currentUser,
  currentChannel: state.channel.currentChannel
});
export default connect(mapStateToProps, { setCurrentChannel })(Chat);