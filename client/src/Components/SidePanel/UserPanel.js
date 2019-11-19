import React, { useState, Fragment } from "react";
import {
  Grid,
  Header,
  Icon,
  Dropdown,
  Image,
  Modal,
  Form,
  Input,
  Button
} from "semantic-ui-react";

import firebase from "../../firebase";

const initialForm = {
  channelName: "",
  channelDetails: ""
};
const UserPanel = ({ currentUser }) => {
  const [modal, setModal] = useState(false);
  const [form, setForm] = useState(initialForm);

  const dropdownOptions = () => [
    {
      key: "user",
      text: (
        <span>
          Signed in as <strong>{currentUser.displayName}</strong>
        </span>
      ),
      disabled: true
    },
    {
      key: "create",
      text: <span onClick={openModal}>Create a channel</span>
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

  const openModal = () => setModal(true);
  const closeModal = () => {
    setForm(initialForm);
    setModal(false);
  };

  const onSignout = async () => {
    firebase.auth().signOut();
  };

  const handleChange = event => {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
  };

  const handleCreate = async event => {
    event.preventDefault();
    const { channelName, channelDetails } = form;
    console.log(firebase.database().ref("channels"));
    try {
      const key = firebase
        .database()
        .ref("channels")
        .push().key;

      const newChannel = {
        id: key,
        name: channelName,
        details: channelDetails,
        createdBy: {
          name: currentUser.displayName,
          avatar: currentUser.photoURL
        }
      };

      await firebase
        .database()
        .ref("channels")
        .child(key)
        .update(newChannel);

      closeModal();
      console.log("channel added ");
    } catch (err) {
      console.log(err);
    }
  };

  const isFormEmpty = ({ channelName, channelDetails }) => {
    return !channelName.trim() || !channelDetails.trim();
  };
  return (
    <Fragment>
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
            <Dropdown
              trigger={
                <span>
                  <Image src={currentUser.photoURL} spaced="right" avatar />
                  {currentUser.displayName}
                </span>
              }
              options={dropdownOptions()}
            />
          </Header>
        </Grid.Column>
      </Grid>
      {/*Create a channel form*/}
      <Modal basic open={modal} onClose={closeModal}>
        <Modal.Header>Create a Channel</Modal.Header>
        <Modal.Content>
          <Form onSubmit={handleCreate}>
            <Form.Field>
              <Input
                fluid
                label="Name of Channel"
                name="channelName"
                onChange={handleChange}
                value={form.channelName}
              />
            </Form.Field>

            <Form.Field>
              <Input
                fluid
                label="About the Channel"
                name="channelDetails"
                onChange={handleChange}
                value={form.channelDetails}
              />
            </Form.Field>
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button
            inverted
            color="green"
            onClick={handleCreate}
            disabled={isFormEmpty(form)}
          >
            <Icon name="checkmark" /> Add
          </Button>
          <Button inverted color="red" onClick={closeModal}>
            <Icon name="remove" /> Cancel
          </Button>
        </Modal.Actions>
      </Modal>
    </Fragment>
  );
};

export default UserPanel;
