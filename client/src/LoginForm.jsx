import React from 'react';
import { Link } from 'react-router-dom';
import { Form, Field } from 'react-advanced-form';
import { Input, Button } from 'react-advanced-form-addons';
import axios from 'axios';

class LoginForm extends React.Component {
  loginUser = ({ serialized }) => {
    // return fetch('/login', {
    //   body: JSON.stringify(serialized)
    // })
    console.log(serialized)
    return axios.post('/login', {
      body: {
        username:serialized.username,
        password: serialized.password
      }
    })
    .then(res =>{
      console.log(res)
     try{
      alert(res.data);
      // this.setState({wasResgistered: res.data.wasResgistered})
     } catch {
       alert('Registration Failed.');
      //  this.setState({wasResgistered: res.data.wasResgistered})
     }
    })
  }

  render() {
    return (
      <div>
        <h2>Login</h2>
        <Form
          action={this.loginUser}
          onSubmitStart={this.props.onSubmitStart}>
          {/* <Field.Group name="primaryInfo"> */}
            <Input
              name="username"
              type="email"
              label="E-mail"
              required />
          {/* </Field.Group> */}
          <Input
            name="password"
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
