import React from 'react';
import { Link } from 'react-router-dom';
import { Form, Field } from 'react-advanced-form';
import { Input, Button } from 'react-advanced-form-addons';

class RegistrationForm extends React.Component {
  registerUser = ({ serialized }) => {
    return fetch('http://localhost:3000/', {
      body: JSON.stringify(serialized)
    })
  }

  render() {
    return (
      <div>
        <h2>Registration</h2>
        <Form
          action={this.registerUser}
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
          <Input
            name="confirmPassword"
            type="password"
            label="Confirm password"
            required
            skip />
          <Field.Group name="primaryInfo">
            <Input
              name="firstName"
              label="First name"
              required={({ get }) => {
                return !!get(['primaryInfo', 'lastName', 'value'])
              }} />
            <Input
              name="lastName"
              label="Last name"
              required={({ get }) => {
                return !!get(['primaryInfo', 'firstName', 'value'])
              }} />
          </Field.Group>
          <Button primary>Register</Button>
        </Form>
        <Link to='/' >Already have an account? Login Here!</Link>
      </div>
    );
  }
}

export default RegistrationForm;
