import React from "react";
import { Grid } from "semantic-ui-react";
import { connect } from "react-redux";
import { setCurrentChannel } from "../redux/actions/index";

import ColorPanel from "./ColorPanel/ColorPanel";
import SidePanel from "./SidePanel/SidePanel";
import Messages from "./Messages/Messages";
import MetaPanel from "./MetaPanel/MetaPanel";

const Chat = ({ user, setCurrentChannel, currentChannel }) => {
  return (
    <Grid columns="equal" className="app">
      <ColorPanel />
      <SidePanel setCurrentChannel={setCurrentChannel} user={user} />

      <Grid.Column style={{ marginLeft: 320 }}>
        <Messages currentChannel={currentChannel} user={user} />
      </Grid.Column>

      <Grid.Column width={4}>
        <MetaPanel />
      </Grid.Column>
    </Grid>
  );
};

const mapStateToProps = state => ({
  user: state.user,
  currentChannel: state.channel.currentChannel
});
export default connect(mapStateToProps, { setCurrentChannel })(Chat);
