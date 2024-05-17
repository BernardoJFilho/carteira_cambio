import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button, Table } from '@mantine/core';
import { deleteItem } from '../redux/actions';

class Tabela extends Component {
  deleteButton = (param) => {
    const { expenses, dispatch } = this.props;
    const elemento = expenses.find((id) => id.id === param);
    dispatch(deleteItem(elemento));
  };

  render() {
    const { expenses } = this.props;
    const rows = expenses
      .map(({ id, description, tag, method, value, exchangeRates, currency }) => (
        <tr style={ { color: 'white' } } key={ id }>
          <td>{description}</td>
          <td>{tag}</td>
          <td>{method}</td>
          <td>{Number(value).toFixed(2)}</td>
          <td>{exchangeRates[currency].name}</td>
          <td>{Number(exchangeRates[currency].ask).toFixed(2)}</td>
          <td>{(value * exchangeRates[currency].ask).toFixed(2)}</td>
          <td>Real</td>
          <td>
            <Button
              data-testid="delete-btn"
              color="cyan"
              onClick={ () => this.deleteButton(id) }
              uppercase
            >
              Excluir
            </Button>
          </td>
        </tr>
      ));
    return (
      <Table
        style={ {
          width: '100%',
          backgroundColor: '#003366',
          color: 'cyan',
          borderColor: '#66CCFF' } }
        verticalSpacing="xs"
        fontSize="md"
        withBorder
        withColumnBorders
      >
        <thead>
          <tr>
            <th style={ { width: '150px' } }>Descrição:</th>
            <th style={ { width: '100px' } }>Tag:</th>
            <th style={ { width: '150px' } }>Método de pagamento:</th>
            <th style={ { width: '100px' } }>Valor:</th>
            <th style={ { width: '200px' } }>Moeda:</th>
            <th style={ { width: '150px' } }>Câmbio utilizado:</th>
            <th style={ { width: '150px' } }>Valor convertido:</th>
            <th style={ { width: '100px' } }>Moeda de conversão:</th>
            <th style={ { width: '80px' } }>Editar/Excluir</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    );
  }
}

Tabela.propTypes = {
  dispatch: PropTypes.func.isRequired,
  expenses: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string,
      currency: PropTypes.string,
    }).isRequired,
  ).isRequired,
};

const mapStateToProps = (state) => ({
  ...state.wallet,
});

export default connect(mapStateToProps)(Tabela);
