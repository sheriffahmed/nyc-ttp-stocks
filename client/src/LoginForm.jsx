import React from 'react';
import { Link } from 'react-router-dom';
import { Form, Field } from 'react-advanced-form';
import { Input, Button } from 'react-advanced-form-addons';

class LoginForm extends React.Component {
  loginUser = ({ serialized, fields, form }) => {
    return fetch('http://localhost:3000/', {
      body: JSON.stringify(serialized)
    })
  }

  render() {
    return (
      <div>
        <h2>Login</h2>
        <Form
          action={this.loginUser}
          onSubmitStart={this.props.onSubmitStart}>
          <Field.Group name="primaryInfo">
            <Input
              name="userEmail"
              type="email"
              label="E-mail"
              required />
          </Field.Group>
          <Input
            name="userPassword"
            type="password"
            label="Password"
            required />

          <Button primary>Login</Button>
        </Form>
        <Link to='/register' >Not registered? Signup Here!</Link>
        <br />
        <br />
      </div>
    );
  }
}

export default LoginForm;
