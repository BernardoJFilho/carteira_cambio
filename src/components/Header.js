import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Center, Flex, Space, Title } from '@mantine/core';

class Header extends Component {
  calcularValor = () => {
    const { expenses } = this.props;
    let total = 0;
    expenses.forEach(({ currency, value, exchangeRates }) => {
      total += value * exchangeRates[currency].ask;
    });
    return total.toFixed(2);
  };

  render() {
    const { email } = this.props;
    return (
      <Center>
        <Flex justify="space-between" w="100%">
          <Title
            order={ 3 }
            style={ { fontFamily: 'Fira-code' } }
            data-testid="email-field"
          >
            { email }
          </Title>
          <Flex>
            <Title
              style={ { fontFamily: 'Fira-code' } }
              data-testid="total-field"
            >
              { this.calcularValor() }
            </Title>
            <Space w="xs" />
            <Title
              style={ { fontFamily: 'Fira-code' } }
              data-testid="header-currency-field"
            >
              BRL
            </Title>
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
