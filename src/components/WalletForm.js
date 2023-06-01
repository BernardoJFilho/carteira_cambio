import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Button, Flex, Input, Select, Stack } from '@mantine/core';
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

  onChangeInputs = ({ target }) => {
    this.setState({ [target.name]: [target.value] });
  };

  onChangeCoin = (value) => {
    this.setState({ currency: value });
  };

  onChangeMethod = (value) => {
    this.setState({ method: value });
  };

  onChangeTag = (value) => {
    this.setState({ tag: value });
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
        <Input
          name="value"
          value={ value }
          type="text"
          placeholder="Valor da despensa:"
          data-testid="value-input"
          onChange={ (e, a) => this.onChangeInputs(e, a) }
          maw={ 400 }
        />
        <Input
          name="description"
          value={ description }
          placeholder="Descrição da despesa:"
          type="text"
          data-testid="description-input"
          onChange={ this.onChangeInputs }
          maw={ 400 }
        />
        <Flex maw={ 400 }>
          <Select
            name="currency"
            value={ currency }
            data-testid="currency-input"
            onChange={ this.onChangeCoin }
            data={ currencies.map((param) => param) }
          />
          <Select
            name="method"
            value={ method }
            data-testid="method-input"
            onChange={ this.onChangeMethod }
            data={ ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'] }
          />
          <Select
            name="tag"
            value={ tag }
            data-testid="tag-input"
            onChange={ this.onChangeTag }
            data={ ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'] }
          />
        </Flex>
        <Stack maw={ 400 }>
          <Button onClick={ this.addValores }>Adicionar despesa</Button>
        </Stack>
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
