import './App.css';
import React from 'react';
import api from './api';

class Portfolio extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      portfolio: [],
      session: true,
      symbolSearch: '',
      quantity: 0,
      buyResponse: ''
    }
    this.checkEsimate = ({ serialized }) => {
      return fetch('http://localhost:3000/', {
        body: JSON.stringify(serialized)
      })
    }
    this.modal = document.getElementById("myModal");
  }

  async componentDidMount() {
    try {
      const resPort = await api.get(`/users/main/portfolio`);
      this.setState({
        portfolio: { ...resPort.data }
      });
    } catch (error) {
      console.log(error)
    }
  }

  handleInput = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  buyStock = async (e) => {
    e.preventDefault();
    try {
      let { symbolSearch, quantity } = this.state
      const resBuy = await api.post(`/transactions/new`, {
        symbol: symbolSearch,
        quantity: Number(quantity)
      })
        .then(res => {
          return this.setState({
            buyResponse: alert(`Your remaining Cash Balance is: ${res.data.balance}`)
          })
        })
        .then(async () => await api.get(`/users/main/portfolio`)
          .then(portfolio => this.setState({
            portfolio: { ...portfolio.data }
          })
          )

        )


    } catch (error) {
      console.log(error)
    }
  }

  render() {
    let { portfolio } = this.state;
    return (
      <div>
        <div>
          <h2>Your Portfolio (Total Value: {portfolio.total})</h2>
          {portfolio.portfolio ? portfolio.portfolio.map(row => {
            return (<ul style={{ display: "flex" }}>
              {row.id}.<div>Company: {row.symbol}</div> <div>Quantity: {row.quantity}</div>
            </ul>)
          }).reverse() : null}

        </div>
        <div>
          Buy Shares
          <input type="text" name='symbolSearch' value={this.state.symbolSearch} onChange={this.handleInput} />
          <input type="number"
            id="quantity" name="quantity" value={this.state.quantity} min="1" max="1000" onChange={this.handleInput} />
          <input type="button" value="Submit" onClick={this.buyStock} />
          {this.state.buyResponse}
        </div>
      </div>
    )
  }
}

export default Portfolio;