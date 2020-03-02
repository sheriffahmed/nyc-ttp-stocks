import React from 'react';
import api from './api';

class Transactions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      transactions: [],
      session: true
    }
  }

  async componentDidMount() {
    if (this.props.transactions || this.props.transactions != null) {
      this.setState({ transactions: this.props.transactions })
    }

    try {
      const resTrans = await api.get(`/transactions/main`);
      this.setState({
        transactions: resTrans.data
      });
    } catch (error) {
      console.log(error)
    }
  }

  render() {
    let { transactions } = this.state;

    return (
      <div>
        <h2>Transaction History</h2>
        <div>{transactions ? transactions.map(row => {
          return (
            <ul style={{ display: "flex" }} >
              {row.id}.{" "}<div>Date:{" "}{row.createdAt}{" "}Company: {" "}{row.symbol}</div>{" "}<div>Quantity: {" "} {row.quantity} Cost: {" "} {row.cost}</div>
            </ul>)
        }) : null}</div>
      </div>
    )
  }
}

export default Transactions;