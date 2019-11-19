import React, { useState } from "react";
import { Segment, Comment } from "semantic-ui-react";

import firebase from "../../firebase";
import MessagesHeader from "./MessagesHeader";
import MessageForm from "./MessageForm";
import Message from "./Message";

const Messages = ({ currentChannel, currentUser }) => {
  const [messages, setMessages] = useState([
    {
      content: "adsda",
      timestamp: 1574149154470,
      user: {
        avatar:
          "http://gravatar.com/avatar/a13cf70aacb36fd2595f62ef51a3d02f?d=identicon",
        id: "1vD5SKOtNFUKTHFDNoWVAKZQ5Km1",
        name: "gnatalie"
      }
    },
    {
      content: "dadas",
      timestamp: 1574149154480,
      user: {
        avatar:
          "http://gravatar.com/avatar/a13cf70aacb36fd2595f62ef51a3d02f?d=identicon",
        id: "1vD5SKOtNFUKTHFDNoWVAKZQ5Km1",
        name: "gnatalie"
      }
    },
    {
      content: "adsssssda",
      timestamp: 1574149154460,
      user: {
        avatar:
          "http://gravatar.com/avatar/a13cf70aacb36fd2595f62ef51a3d02f?d=identicon",
        id: "1vD5SKOtNFUKTHFDNoWVAKZQ5Km1",
        name: "gnatdsdsalie"
      }
    },
    {
      content: "adsdadsaa",
      timestamp: 1574149154470,
      user: {
        avatar:
          "http://gravatar.com/avatar/a13cf70aacb36fd2595f62ef51a3d02f?d=identicon",
        id: "1vD5SKOtNFUKTHFDNoWVAKZQ5Km1",
        name: "gnaaatalie"
      }
    }
  ]);

  const messagesRef = firebase.database().ref("messages");

  const displayMessages = msgs =>
    msgs.length > 0 &&
    msgs.map(msg => (
      <Message key={msg.timestamp} message={msg} user={currentUser} />
    ));

  return (
    <React.Fragment>
      <MessagesHeader />

      <Segment>
        <Comment.Group className="messages">
          {displayMessages(messages)}
        </Comment.Group>
      </Segment>

      <MessageForm
        messagesRef={messagesRef}
        currentChannel={currentChannel}
        currentUser={currentUser}
      />
    </React.Fragment>
  );
};

export default Messages;
