import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Form, Field } from 'react-advanced-form';
import { Input, Button } from 'react-advanced-form-addons';
import api from './api';

class RegistrationForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      serialized: null,
      response: '',
      wasResgistered: null
    }
  }

  registerUser = ({ serialized }) => {
    // console.log(serialized)
    return api.post('/users', {
      ...serialized
    })
    .then(res =>{
      console.log(res)
     try{
      alert(res.data.message);
      this.setState({wasResgistered: res.data.wasResgistered})
     } catch {
       alert('Registration Failed.');
       this.setState({wasResgistered: res.data.wasResgistered})
     }
    })

  }

  render() {
    if(this.state.wasResgistered){
      return <Redirect to='/' />
    }
    return (
      <div>
        <h2>Registration</h2>
        <Form
          action={this.registerUser}
          onSubmitStart={''}>
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
