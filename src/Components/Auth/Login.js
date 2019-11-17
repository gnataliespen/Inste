import React, { useState } from "react";
import { Link } from "react-router-dom";
import firebase from "../../firebase";
import {
  Grid,
  Form,
  Segment,
  Header,
  Button,
  Message
} from "semantic-ui-react";

const initialState = {
  email: "",
  password: ""
};
const Login = () => {
  const [login, setLogin] = useState(initialState);
  const [loading, setLoading] = useState(false);

  const handleChange = event => {
    setLogin({
      ...login,
      [event.target.name]: event.target.value
    });
  };

  const isFormEmpty = ({ email, password }) => {
    return !email.trim() || !password.trim();
  };

  const onSubmit = async event => {
    event.preventDefault();
    setLoading(true);
    const { password, email } = login;
    try {
      const res = await firebase
        .auth()
        .signInWithEmailAndPassword(email, password);
      setLogin(initialState);
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };
  return (
    <Grid textAlign="center" verticalAlign="middle" className="app">
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as="h1" textAlign="center">
          Login
        </Header>
        <Form size="large" onSubmit={onSubmit} loading={loading}>
          <Segment stacked>
            <Form.Input
              fluid
              name="email"
              icon="mail"
              iconPosition="left"
              placeholder="Email address"
              onChange={handleChange}
              value={login.email}
              type="email"
            />
            <Form.Input
              fluid
              name="password"
              icon="lock"
              iconPosition="left"
              placeholder="Password"
              onChange={handleChange}
              value={login.password}
              type="password"
            />

            <Button
              color="orange"
              fluid
              size="large"
              disabled={isFormEmpty(login) || loading}
            >
              Submit
            </Button>
          </Segment>
        </Form>
        <Message>
          Not a user? <Link to="/register">Sign up</Link>
        </Message>
      </Grid.Column>
    </Grid>
  );
};

export default Login;
