import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Center, Flex, Title } from '@mantine/core';

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
      <Center>
        <Flex justify="space-between" w="100%">
          <Title data-testid="email-field">{ email }</Title>
          <Flex>
            <Title data-testid="total-field">{ this.calcularValor() }</Title>
            <Title data-testid="header-currency-field">BRL</Title>
          </Flex>
        </Flex>
      </Center>
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
