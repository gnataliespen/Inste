import React, { useState } from "react";
import { Segment, Button, Input } from "semantic-ui-react";

const MessageForm = ({ messagesRef, currentChannel, user }) => {
  const [msg, setMsg] = useState("");

  const handleChange = event => {
    setMsg(event.target.value);
  };

  const createMsg = () => {
    console.log(user.avatar);
    const message = {
      content: msg,
      user: user._id
    };
    return message;
  };

  const sendMsg = async () => {
    console.log(currentChannel.id);
    let mess = createMsg();
    console.log(mess);
    try {
      await messagesRef
        .child(currentChannel.id)
        .push()
        .set(mess);
    } catch (err) {
      console.log(err);
    }
    setMsg("");
  };

  return (
    <Segment className="message__form">
      <Input
        fluid
        name="message"
        onChange={handleChange}
        style={{ marginBottom: "0.7em" }}
        label={<Button icon={"add"} />}
        value={msg}
        labelPosition="left"
        placeholder="Write your message"
      />
      <Button.Group icon widths="2">
        <Button
          onClick={sendMsg}
          color="orange"
          content="Add Reply"
          labelPosition="left"
          icon="edit"
          disabled={!msg.trim()}
        />
        <Button
          color="teal"
          content="Upload Media"
          labelPosition="right"
          icon="cloud upload"
        />
      </Button.Group>
    </Segment>
  );
};

export default MessageForm;
