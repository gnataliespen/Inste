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
import Cookies from "js-cookie";

const initialForm = {
  channelName: "",
  channelDetails: ""
};
const UserPanel = ({ currentUser, logout, socket }) => {
  const [modal, setModal] = useState(false);
  const [form, setForm] = useState(initialForm);

  const dropdownOptions = () => [
    {
      key: "user",
      text: (
        <span>
          Signed in as <strong>{currentUser.username}</strong>
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
      text: <span onClick={logout}>Signout</span>
    }
  ];

  const openModal = () => setModal(true);
  const closeModal = () => {
    setForm(initialForm);
    setModal(false);
  };

  const handleChange = event => {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
  };

  const handleCreate = async event => {
    event.preventDefault();
    const { channelName, channelDetails } = form;
    let token = Cookies.get("token");

    try {
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
                  <Image src={currentUser.avatar} spaced="right" avatar />
                  {currentUser.username}
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
