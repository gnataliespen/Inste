import React, { useState } from "react";
import { Grid, Header, Icon, Dropdown } from "semantic-ui-react";
import firebase from "../../firebase";
const UserPanel = () => {
  const dropdownOptions = () => [
    {
      key: "user",
      text: (
        <span>
          Signed in as <strong>user</strong>
        </span>
      ),
      disabled: true
    },
    {
      key: "avatar",
      text: <span>Change avatar</span>
    },
    {
      key: "signout",
      text: <span onClick={onSignout}>Signout</span>
    }
  ];
  const onSignout = async () => {
    firebase.auth().signOut();
  };
  return (
    <Grid>
      <Grid.Column>
        <Grid.Row>
          {/*Main App Header*/}
          <Header inverted floated="left" as="h1">
            <Icon name="comments" />
            <Header.Content>Inste</Header.Content>
          </Header>
        </Grid.Row>

        {/*User Dropdown*/}
        <Header inverted style={{ padding: "0.25em" }} as="h4">
          <Dropdown trigger={<span>User</span>} options={dropdownOptions()} />
        </Header>
      </Grid.Column>
    </Grid>
  );
};

export default UserPanel;
