import './App.css';
import React from 'react';
import { Redirect, Link, Switch, Route } from "react-router-dom";
import Portfolio from './Portfolio';
import Transactions from './Transactions';
import api from './api'

class StockPortal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      portfolio: null,
      transactions: [],
      session: true
    }
  }

  componentWillMount() {
    if (this.state.session == null) {
      const { session } = this.props.location.state
      this.setState({ session: session });
    }
  }

  async componentDidMount() {
    try {
      const resPort = await api.get(`/users/main/portfolio`);
      const resTrans = await api.get(`/transactions/main`);
      this.setState({
        portfolio: { ...resPort.data },
        transactions: resTrans.data,
      });
    } catch (error) {
      console.log(error)
    }
  }

  render() {
    if (this.state.session == null) {
      return <Redirect to='/' />
    }

    return (
      <div>
        <div>
          <Link to='/portal/test/portfolio'>Portfolio</Link> {"|"}
          <Link to='/portal/test/transactions'>Transactions</Link>
        </div>

        <Switch>
          <Route
            exact
            path='/portal/:user/transactions'
            render={() => <Transactions
              session={this.state.session}
              transactions={this.state.transactions}
            />}
          />
          <Route
            path='/portal/:user/portfolio'
            render={() => <Portfolio
              session={this.state.session}
              portfolio={this.state.transactions} />}
          />
        </Switch>
        {this.state.portfolio !== null ? <Redirect to={{
          pathname: '/portal/test/portfolio',
          state: { portfolio: this.state.portfolio }
        }} />
          : null}
      </div>
    )
  }
}

export default StockPortal;