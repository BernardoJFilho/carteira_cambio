import { act, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import WalletForm from '../components/WalletForm';
import Wallet from '../pages/Wallet';
import mockData from './helpers/mockData';

const globalExpense = {
  id: 0,
  value: '15',
  currency: 'USD',
  method: 'Dinheiro',
  tag: 'Lazer',
  description: 'Quinze Dolares',
  exchangeRates: mockData,
};

const initialState = {
  user: {
    email: 'email@email.com',
  },
  wallet: {
    total: 52.28,
    currency: 'BRL',
    currencies: ['USD',
      'CAD',
      'GBP',
      'ARS',
      'BTC',
      'LTC',
      'EUR',
      'JPY',
      'CHF',
      'AUD',
      'CNY',
      'ILS',
      'ETH',
      'XRP',
      'DOGE'],
    expenses: [
      globalExpense,
    ],
    edit: false,
    indexExp: 0,
  },
};

describe('Testa o Login', () => {
  it('testa se exibe o componente Table na pagina /carteira', () => {
    renderWithRouterAndRedux(<Wallet />);
    const descricao = screen.getByRole('columnheader', { name: /descrição:/i });
    const tag = screen.getByRole('columnheader', { name: /tag:/i });
    const metodoDePagamento = screen.getByRole('columnheader', { name: /método de pagamento:/i });
    const valor = screen.getByRole('columnheader', { name: /valor:/i });
    const moeda = screen.getByRole('columnheader', { name: /moeda:/i });
    const cambioUtilizado = screen.getByRole('columnheader', { name: /câmbio utilizado:/i });
    const valorConvertido = screen.getByRole('columnheader', { name: /valor convertido:/i });
    const moedaDeConversao = screen.getByRole('columnheader', { name: /moeda de conversão:/i });
    const editarExcluir = screen.getByRole('columnheader', { name: /editar\/excluir/i });
    expect(descricao).toBeInTheDocument();
    expect(tag).toBeInTheDocument();
    expect(metodoDePagamento).toBeInTheDocument();
    expect(valor).toBeInTheDocument();
    expect(moeda).toBeInTheDocument();
    expect(cambioUtilizado).toBeInTheDocument();
    expect(valorConvertido).toBeInTheDocument();
    expect(moedaDeConversao).toBeInTheDocument();
    expect(editarExcluir).toBeInTheDocument();
  });
  it('Testa se o estado global tem todas as informações passadas', async () => {
    const { store } = renderWithRouterAndRedux(<WalletForm />);
    const valueInput = screen.getByRole('textbox', { name: /valor da despesa:/i });
    const descriptionInput = screen.getByRole('textbox', { name: /descrição da despesa:/i });
    userEvent.type(valueInput, '20');
    userEvent.type(descriptionInput, 'Vinte Dolares');
    const buttonAddDespesa = screen.getByRole('button', {
      name: /adicionar despesa/i,
    });
    act(() => userEvent.click(buttonAddDespesa));
    await waitFor(() => {
      const globalState = store.getState();
      const { wallet } = globalState;
      expect(wallet.expenses[0].value).toBe('20');
      expect(wallet.expenses[0].description).toBe('Vinte Dolares');
    });
  });
  it('Testa se o botão despesa funciona', () => {
    const { store } = renderWithRouterAndRedux(<Wallet />, { initialState });
    const buttonDelet = screen.getByRole('button', {
      name: /excluir/i,
    });
    userEvent.click(buttonDelet);
    const state = store.getState();
    const { wallet } = state;
    expect(wallet.expenses).toEqual([]);
  });
});
