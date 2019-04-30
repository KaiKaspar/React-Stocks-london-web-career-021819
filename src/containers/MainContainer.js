import React, { Component } from 'react';
import StockContainer from './StockContainer'
import PortfolioContainer from './PortfolioContainer'
import SearchBar from '../components/SearchBar'

class MainContainer extends Component {

  state = {
      stocks: [],
      portfolio: []
    }

  componentDidMount() {
    fetch('http://localhost:3000/stocks')
      .then(res => res.json())
      .then(stocks => this.setState({ stocks }))
  }

  addToPortfolio = stock => {
    if (!this.state.portfolio.includes(stock)) {
    this.setState({
      portfolio: [...this.state.portfolio, stock],
      stocks: this.state.stocks.filter(s => s !== stock)
    })}
  }

  sellFromPortfolio = stock => {
    if (this.state.portfolio.includes(stock)) {
    this.setState({
      portfolio: this.state.portfolio.filter(s => s !== stock),
      stocks: [...this.state.stocks, stock]
    })}
  }



  render() {
    return (
      <div>
        <SearchBar/>

          <div className="row">
            <div className="col-8">

              <StockContainer stocks={this.state.stocks} handleClick={this.addToPortfolio}/>

            </div>
            <div className="col-4">

              <PortfolioContainer portfolio={this.state.portfolio} handleClick={this.sellFromPortfolio}/>

            </div>
          </div>
      </div>
    );
  }

}

export default MainContainer;
