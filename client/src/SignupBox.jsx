import './styles.css';
import React from 'react';
import { Redirect, Switch, Route } from "react-router-dom";
import { FormProvider } from 'react-advanced-form';
import rules from './validate';
import messages from './validation-messages';
import RegistrationForm from './RegistrationForm';
import LoginForm from './LoginForm';

class SignupBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      serialized: null,
      session: false
    }
  }

  handleSubmitStart = ({ serialized }) => {
    this.setState({
      serialized: serialized,
      session: true
    })
  }

  render() {
    if (this.state.serialized !== null) {
      return <Redirect to={{
        pathname: '/portal/test',
        state: {
          session: true
        }

      }} />
    }
    return (
      <div className='wrapper'>
        <div className='container'>
          <FormProvider rules={rules} messages={messages}>
            <Switch>
              <div className="flex">
                <Route path='/register'> <RegistrationForm onSubmitStart={this.handleSubmitStart} /> </Route>
                <Route exact path='/' ><LoginForm onSubmitStart={this.handleSubmitStart} />  </Route>
              </div>
            </Switch>
          </FormProvider>
        </div>
      </div>
    )
  }
}

export default SignupBox;