module.exports.validateRegisterInput = (
  username,
  email,
  password,
  confirmPassword
) => {
  const errors = {};

  if (username.trim() === "") {
    errors.username = "Username must not be empty";
  }

  if (email.trim() === "") {
    errors.email = "Email must no be empty";
  } else {
    const regEx = /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;
    if (!email.match(regEx)) {
      errors.email = "Not an email";
    }
  }

  if (password === "") {
    errors.password = "Please enter a password";
  } else if (password !== confirmPassword) {
    errors.confirmPassword = "Passwords don't match";
  }

  return {
    //valid(boolean) will be true if there are errors
    errors,
    valid: Object.keys(errors).length < 1,
  };
};

module.exports.validateLoginInput = (username, password) => {
  const errors = {};
  if (username.trim() === "") {
    errors.username = "Enter an username";
  }
  if (password.trim() === "") {
    errors.password = "Enter a password";
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};