import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import App from '../App';
import Wallet from '../pages/Wallet';

describe('testa pagina Wallet', () => {
  it('testa se exibe o email digitado na pagina de login', () => {
    renderWithRouterAndRedux(<App />);
    const inputEmail = screen.getByRole('textbox');
    const inputSenha = screen.getByPlaceholderText(/senha/i);
    const button = screen.getByRole('button', { name: /entrar/i });
    userEvent.type(inputEmail, 'email@email.com');
    userEvent.type(inputSenha, '123456');
    userEvent.click(button);
    const emailWallet = screen.getByRole('heading', { name: /email@email\.com/i });
    expect(emailWallet).toBeInTheDocument();
  });
  it('testa todos os componentes na tela', () => {
    renderWithRouterAndRedux(<Wallet />);
    const titulo = screen.getByText(/trybewallet/i);
    const valor = screen.getByText(/0\.00/i);
    const valorDespesa = screen.getByRole('textbox', { name: /valor da despesa:/i });
    const descricao = screen.getByRole('textbox', { name: /descrição da despesa:/i });
    expect(titulo).toBeInTheDocument();
    expect(valor).toBeInTheDocument();
    expect(valorDespesa).toBeInTheDocument();
    expect(descricao).toBeInTheDocument();
  });
});
