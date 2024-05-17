import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Flex } from '@mantine/core';
import { deleteItem } from '../redux/actions';

class Table extends Component {
  deleteButton = (param) => {
    const { expenses, dispatch } = this.props;
    const elemento = expenses.find((id) => id.id === param);
    dispatch(deleteItem(elemento));
  };

  render() {
    const { expenses } = this.props;
    return (
      <Flex direction="column" gap="md">
        <table>
          <thead>
            <tr>
              <th>Descrição:</th>
              <th>Tag:</th>
              <th>Método de pagamento:</th>
              <th>Valor:</th>
              <th>Moeda:</th>
              <th>Câmbio utilizado:</th>
              <th>Valor convertido:</th>
              <th>Moeda de conversão:</th>
              <th>Editar/Excluir</th>
            </tr>
          </thead>
          <tbody>
            {expenses
              .map(({ id, description, tag, method, value, exchangeRates, currency }) => (
                <tr key={ id }>
                  <td>{description}</td>
                  <td>{tag}</td>
                  <td>{method}</td>
                  <td>{Number(value).toFixed(2)}</td>
                  <td>{exchangeRates[currency].name}</td>
                  <td>{Number(exchangeRates[currency].ask).toFixed(2)}</td>
                  <td>{(value * exchangeRates[currency].ask).toFixed(2)}</td>
                  <td>Real</td>
                  <td>
                    <button
                      data-testid="delete-btn"
                      onClick={ () => this.deleteButton(id) }
                    >
                      Excluir
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </Flex>
    );
  }
}

Table.propTypes = {
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

export default connect(mapStateToProps)(Table);
