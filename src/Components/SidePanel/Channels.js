import React, { useState, Fragment } from "react";
import { Menu, Icon, Modal, Form, Input, Button } from "semantic-ui-react";

const initialForm = {
  channelName: "",
  channelDetails: ""
};
const Channels = () => {
  const [modal, setModal] = useState(false);
  const [form, setForm] = useState(initialForm);

  let channels = [1];

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
