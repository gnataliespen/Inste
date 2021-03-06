import React, { useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import md5 from "md5";
import {
  Grid,
  Form,
  Segment,
  Header,
  Button,
  Message
} from "semantic-ui-react";

import { register } from "../../redux/actions/user";

const initialState = {
  username: "",
  email: "",
  password: "",
  conPass: ""
};
const Register = ({ register }) => {
  const [registration, setRegistration] = useState(initialState);
  const [loading, setLoading] = useState(false);

  const handleChange = event => {
    setRegistration({
      ...registration,
      [event.target.name]: event.target.value
    });
  };

  const isFormEmpty = ({ username, email, password, conPass }) => {
    return (
      !username.trim() || !email.trim() || !password.trim() || !conPass.trim()
    );
  };
  const onSubmit = async event => {
    event.preventDefault();
    setLoading(true);
    const { conPass, password, username, email } = registration;
    if (password !== conPass) {
      console.log("Passwords do not match");
      setLoading(false);

      return;
    }
    try {
      const userObj = {
        email,
        username,
        password,
        avatar: `http://gravatar.com/avatar/${md5(email)}?d=identicon`
      };
      console.log(userObj);
      await register(userObj);
      setRegistration(initialState);
    } catch (err) {
      console.log(err.response);
    }
    setLoading(false);
  };

  return (
    <Grid textAlign="center" verticalAlign="middle" className="app">
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as="h1" icon color="orange" textAlign="center">
          Register
        </Header>
        <Form size="large" onSubmit={onSubmit} loading={loading}>
          <Segment stacked>
            <Form.Input
              fluid
              name="username"
              icon="user"
              iconPosition="left"
              placeholder="Username"
              minLength={3}
              onChange={handleChange}
              value={registration.username}
              type="text"
            />
            <Form.Input
              fluid
              name="email"
              icon="mail"
              iconPosition="left"
              placeholder="Email address"
              onChange={handleChange}
              value={registration.email}
              type="email"
            />
            <Form.Input
              fluid
              name="password"
              icon="lock"
              iconPosition="left"
              placeholder="Password"
              minLength={6}
              onChange={handleChange}
              value={registration.password}
              type="password"
            />
            <Form.Input
              fluid
              name="conPass"
              icon="repeat"
              iconPosition="left"
              placeholder="Confirm your password"
              minLength={6}
              onChange={handleChange}
              value={registration.conPass}
              type="password"
            />
            <Button
              color="orange"
              fluid
              size="large"
              disabled={isFormEmpty(registration) || loading}
            >
              Submit
            </Button>
          </Segment>
        </Form>
        <Message>
          Already a user? <Link to="/login">Login</Link>
        </Message>
      </Grid.Column>
    </Grid>
  );
};

export default connect(null, { register })(Register);
