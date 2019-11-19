import React, { useState } from "react";
import { Segment, Button, Input } from "semantic-ui-react";
import firebase from "../../firebase";

const MessageForm = ({ messagesRef, currentChannel, currentUser }) => {
  const [msg, setMsg] = useState("");

  const handleChange = event => {
    setMsg(event.target.value);
  };

  const createMsg = () => {
    console.log(currentUser.photoUrl);
    const message = {
      content: msg,
      timestamp: firebase.database.ServerValue.TIMESTAMP,
      user: {
        id: currentUser.uid,
        name: currentUser.displayName,
        avatar: currentUser.photoURL
      }
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
