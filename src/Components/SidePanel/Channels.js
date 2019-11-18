import React, { useState, Fragment, useEffect } from "react";
import { Menu, Icon, Modal, Form, Input, Button } from "semantic-ui-react";
import firebase from "../../firebase";

const initialForm = {
  channelName: "",
  channelDetails: ""
};
const Channels = ({ setCurrentChannel }) => {
  const [modal, setModal] = useState(false);
  const [form, setForm] = useState(initialForm);
  const [channels, setChannels] = useState([]);

  useEffect(() => {
    addListeners();
    return () => {};
  }, []);

  const addListeners = () => {
    let loadedChannels = [];
    firebase
      .database()
      .ref("channels")
      .on("child_added", snap => {
        loadedChannels.push(snap.val());
        setChannels([...loadedChannels]);
      });
  };

  const displayChannels = channels =>
    channels.length > 0 &&
    channels.map(channel => (
      <Menu.Item
        key={channel.id}
        onClick={() => setCurrentChannel(channel)}
        name={channel.name}
        style={{ opacity: 0.7 }}
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
          ({channels.length}) <Icon name="add" onClick={openModal} />
        </Menu.Item>
        {console.log(channels.channels)}
        {displayChannels(channels)}
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
