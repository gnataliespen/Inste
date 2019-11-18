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
  const [activeChannel, setActiveChannel] = useState("");

  useEffect(() => {
    addListeners();
    return () => {
      firebase
        .database()
        .ref("channels")
        .off();
    };
  }, []);

  const firstLoad = () => {
    if (!activeChannel && channels.length > 0) {
      changeChannel(channels[0]);
    }
  };

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

  firstLoad();

  return (
    <Fragment>
      <Menu.Menu style={{ paddingBottom: "2em" }}>
        <Menu.Item>
          <span>
            <Icon name="exchange" /> CHANNELS{" "}
          </span>
          ({channels.length}) <Icon name="add" onClick={openModal} />
        </Menu.Item>
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
