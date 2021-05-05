/* eslint-disable */

import React, { useState, useContext } from "react";
import Navbar from "./Navbar";
import gql from "graphql-tag";
import { useMutation } from "@apollo/client";
import "../styles/Pages.css";
import { Input, Spacer, Modal, Note } from "@geist-ui/react";
import { User, Mail } from "@geist-ui/react-icons";
import { Redirect, useHistory } from "react-router";
import { AuthContext } from "../context/auth";

export default function Register(props) {
  const context = useContext(AuthContext);
  const history = useHistory();
  const [errors, setErrors] = useState({});
  const { showRegister, closeHandler, setShowRegister } = props;

  const [input, setInput] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  function handleChange(event) {
    setInput({ ...input, [event.target.name]: event.target.value });
  }

  const [addUser, { loading }] = useMutation(REGISTER_USER, {
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
    addUser();
  }

  return (
    <div>
      <Modal open={showRegister} onClose={closeHandler}>
        <form className="register-form">
          <h3>Create your account</h3>
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
          <Input
            clearable
            width="80%"
            placeholder="Email"
            name="email"
            value={input.email}
            onChange={handleChange}
            icon={<Mail />}
          />
          <Spacer y={0.5} />
          <Input.Password
            width="80%"
            placeholder="Password"
            name="password"
            value={input.password}
            onChange={handleChange}
          />
          <Spacer y={0.5} />
          <Input.Password
            width="80%"
            placeholder="Confirm Password"
            name="confirmPassword"
            value={input.confirmPassword}
            onChange={handleChange}
          />
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

        <Modal.Action passive onClick={() => setShowRegister(false)}>
          Cancel
        </Modal.Action>
        <Modal.Action onClick={handleSubmit}>Submit</Modal.Action>
      </Modal>
    </div>
  );
}

const REGISTER_USER = gql`
  mutation register(
    $username: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
  ) {
    register(
      registerInput: {
        username: $username
        email: $email
        password: $password
        confirmPassword: $confirmPassword
      }
    ) {
      id
      email
      username
      createdAt
      token
    }
  }
`;
