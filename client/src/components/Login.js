import React, { useState, useContext } from "react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/client";
import "../styles/Pages.css";
import { Input, Spacer, Modal, Note } from "@geist-ui/react";
import { User, Mail } from "@geist-ui/react-icons";
import { Redirect, useHistory } from "react-router";
import { AuthContext } from "../context/auth";

export default function Login(props) {
  const history = useHistory();
  const context = useContext(AuthContext);
  const [errors, setErrors] = useState({});
  const { showLogin, closeHandler, setShowLogin } = props;

  const [input, setInput] = useState({
    username: "",
    password: "",
  });

  function handleChange(event) {
    setInput({ ...input, [event.target.name]: event.target.value });
  }

  const [loginUser, { loading }] = useMutation(LOGIN_USER, {
    update(proxy, result) {
      context.login(result.data.login);
      closeHandler();
      history.push("/");
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },
    variables: input,
  });

  function handleSubmit() {
    loginUser();
  }

  return (
    <div>
      <Modal open={showLogin} onClose={setShowLogin}>
        <form className="register-form">
          <h3>Login</h3>
          <Modal.Subtitle>Enter your details</Modal.Subtitle>
          <Spacer y={1} />
          <Input
            clearable
            width="80%"
            placeholder="Username"
            name="username"
            value={input.username}
            onChange={handleChange}
            icon={<User />}
          />
          <Spacer y={0.5} />

          <Spacer y={0.5} />
          <Input.Password
            width="80%"
            placeholder="Password"
            name="password"
            value={input.password}
            onChange={handleChange}
          />
          <Spacer y={0.5} />
        </form>

        {Object.keys(errors).length > 0 && (
          <div>
            <Spacer y={0.5} />
            {Object.values(errors).map((value) => {
              return (
                <div key={value} className="input-error-msg">
                  <Note small="true" type="error" label="">
                    {value}
                  </Note>
                  <Spacer y={0.25} />
                </div>
              );
            })}
          </div>
        )}

        <Modal.Action passive onClick={() => setShowLogin(false)}>
          Cancel
        </Modal.Action>
        <Modal.Action onClick={handleSubmit}>Login</Modal.Action>
      </Modal>
    </div>
  );
}

const LOGIN_USER = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      id
      email
      username
      token
    }
  }
`;
