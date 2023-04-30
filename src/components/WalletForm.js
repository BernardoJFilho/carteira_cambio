import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { valuesWallet, walletInformation } from '../redux/actions';

const initialState = {
  value: '',
  description: '',
};

class WalletForm extends Component {
  state = {
    id: 0,
    value: '',
    description: '',
    currency: 'USD',
    method: 'Dinheiro',
    tag: 'Alimentação',
    exchangeRates: {},
  };

  async componentDidMount() {
    const { dispatch } = this.props;
    dispatch(walletInformation());
  }

  onChange = ({ target }) => {
    this.setState({
      [target.name]: target.value,
    });
  };

  addValores = async () => {
    const { id } = this.state;
    const { dispatch } = this.props;
    this.setState({
      id: id + 1,
    });
    this.setState(initialState);
    dispatch(valuesWallet(this.state));
  };

  render() {
    const { value, description, currency, method, tag } = this.state;
    const { currencies } = this.props;
    return (
      <>
        <label>
          Valor da despesa:
          <input
            name="value"
            value={ value }
            type="text"
            data-testid="value-input"
            onChange={ this.onChange }
          />
        </label>
        <br />
        <label>
          Descrição da despesa:
          <input
            name="description"
            value={ description }
            type="text"
            data-testid="description-input"
            onChange={ this.onChange }
          />
        </label>
        <br />
        <select
          name="currency"
          value={ currency }
          data-testid="currency-input"
          onChange={ this.onChange }
        >
          {currencies.map((param, index) => (
            <option key={ index }>{ param }</option>
          ))}
        </select>
        <select
          name="method"
          value={ method }
          data-testid="method-input"
          onChange={ this.onChange }
        >
          <option>Dinheiro</option>
          <option>Cartão de crédito</option>
          <option>Cartão de débito</option>
        </select>
        <select
          name="tag"
          value={ tag }
          data-testid="tag-input"
          onChange={ this.onChange }
        >
          <option>Alimentação</option>
          <option>Lazer</option>
          <option>Trabalho</option>
          <option>Transporte</option>
          <option>Saúde</option>
        </select>
        <br />
        <button onClick={ this.addValores }>Adicionar despesa</button>
      </>
    );
  }
}

WalletForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(
    PropTypes.arrayOf,
  ).isRequired,
};

const mapStateToProps = (state) => ({
  ...state.wallet,
});

export default connect(mapStateToProps)(WalletForm);
