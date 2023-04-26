import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class WalletForm extends Component {
  render() {
    const { currencies } = this.props;
    // const array = JSON.stringify(currencies);
    console.log(currencies);
    return (
      <>
        <label>
          Valor da despesa:
          <input type="text" data-testid="value-input" />
        </label>
        <br />
        <label>
          Descrição da despesa:
          <input type="text" data-testid="description-input" />
        </label>
        <br />
        <select data-testid="currency-input">
          {currencies.USD === '' ? <option>BRL</option> : (
            currencies.map((param, index) => (
              <option key={ index }>{ param }</option>
            ))
          )}
        </select>
        <select data-testid="method-input">
          <option>Dinheiro</option>
          <option>Cartão de crédito</option>
          <option>Cartão de débito</option>
        </select>
        <select data-testid="tag-input">
          <option>Alimentação</option>
          <option>Lazer</option>
          <option>Trabalho</option>
          <option>Transporte</option>
          <option>Saúde</option>
        </select>
      </>
    );
  }
}

WalletForm.propTypes = {
  currencies: PropTypes.arrayOf(
    PropTypes.arrayOf,
  ).isRequired,
};

const mapStateToProps = (state) => ({
  ...state.wallet,
});

export default connect(mapStateToProps)(WalletForm);
