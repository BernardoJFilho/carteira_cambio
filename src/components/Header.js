import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends Component {
  calcularValor = () => {
    const { expenses } = this.props;
    const allNumbers = [0];
    let total = 0;
    expenses.map(({ currency, value, exchangeRates }) => (
      allNumbers.push(value * exchangeRates[currency].ask)
    ));
    // allNumbers.map((param) => total += param); funciona mais da erro
    for (let i = 0; i < allNumbers.length; i += 1) {
      total += allNumbers[i];
    }
    return total.toFixed(2);
  };

  render() {
    const { email } = this.props;
    return (
      <div>
        <h1 data-testid="email-field">{ email }</h1>
        <p data-testid="total-field">{ this.calcularValor() }</p>
        <p data-testid="header-currency-field">BRL</p>
      </div>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string,
      currency: PropTypes.string,
    }).isRequired,
  ).isRequired,
};

const mapStateToProps = (state) => ({
  ...state.user,
  ...state.wallet,
});

export default connect(mapStateToProps)(Header);
