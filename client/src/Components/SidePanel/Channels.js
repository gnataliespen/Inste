import React, { useState, Fragment, useEffect } from "react";
import { Menu, Icon, Modal, Form, Input, Button } from "semantic-ui-react";

const initialForm = {
  channelName: "",
  channelDetails: ""
};
const Channels = ({ setCurrentChannel, user }) => {
  const [modal, setModal] = useState(false);
  const [form, setForm] = useState(initialForm);
  const [activeChannel, setActiveChannel] = useState("");

  /*const firstLoad = () => {
    if (!activeChannel && channels.length > 0) {
      changeChannel(channels[0]);
    }
  };*/
  console.log(user);

  const changeChannel = channel => {
    setActiveChannel(channel.id);
    setCurrentChannel(channel);
  };

  const displayChannels = channels =>
    channels.length > 0 &&
    channels.map(channel => (
      <Menu.Item
        key={channel.id}
        onClick={() => changeChannel(channel)}
        name={channel.name}
        style={{ opacity: 0.7 }}
        active={channel.id === activeChannel}
      >
        # {channel.name}
      </Menu.Item>
    ));

  const closeModal = () => {
    setForm(initialForm);
    setModal(false);
  };
  const openModal = () => setModal(true);

  const handleChange = event => {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
  };

  return (
    <Fragment>
      <Menu.Menu style={{ paddingBottom: "2em" }}>
        <Menu.Item>
          <span>
            <Icon name="exchange" /> CHANNELS{" "}
          </span>
          ({/*user.joinedChannels.length */})0{" "}
          <Icon name="add" onClick={openModal} />
        </Menu.Item>
        {displayChannels(user.joinedChannels || [])}
      </Menu.Menu>
      <Modal basic open={modal} onClose={closeModal}>
        <Modal.Header>Add a Channel</Modal.Header>
        <Modal.Content>
          <Form>
            <Form.Field>
              <Input
                fluid
                label="Name of Channel"
                name="channelName"
                onChange={handleChange}
                value={form.channelName}
              />
            </Form.Field>
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button inverted color="green">
            <Icon name="checkmark" /> Search
          </Button>
        </Modal.Actions>
      </Modal>
    </Fragment>
  );
};

export default Channels;
