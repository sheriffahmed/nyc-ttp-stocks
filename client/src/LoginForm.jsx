import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Form, Field } from 'react-advanced-form';
import { Input, Button } from 'react-advanced-form-addons';
import api from './api';

class LoginForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      wasResgistered: false
    }
  }


  loginUser = ({ serialized }) => {
    console.log(serialized)
    return api.post('/login', {
      username:serialized.username,
      password: serialized.password
    })
    .then(res =>{
      console.log(res)
     try{
      console.log(res.data);
      this.setState({wasResgistered: res.status === 200})
     } catch {
       alert('Registration Failed.');
       this.setState({wasResgistered: res.status !== 200})
     }
    })
  }

  render() {
    console.log({statee: this.state})
    return this.state.wasResgistered ?  <Redirect to='/portal/home/portfolio'/> : (
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
