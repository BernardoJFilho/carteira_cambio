import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Table extends Component {
  render() {
    const { expenses } = this.props;

    return (
      <>
        <th>
          Descrição:
        </th>
        <br />
        <th>
          Tag:
        </th>
        <br />
        <th>
          Método de pagamento:
        </th>
        <br />
        <th>
          Valor:
        </th>
        <br />
        <th>
          Moeda:
        </th>
        <br />
        <th>
          Câmbio utilizado:
        </th>
        <br />
        <th>
          Valor convertido:
        </th>
        <br />
        <th>
          Moeda de conversão:
        </th>
        <br />
        <th>Editar/Excluir</th>
        <br />
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
                <td>
                  {(value * exchangeRates[currency].ask).toFixed(2)}
                </td>
                <td>Real</td>
              </tr>
            ))}
        </tbody>
      </>

    );
  }
}

Table.propTypes = {
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
