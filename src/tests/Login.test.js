import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import App from '../App';

describe('testa pagina de login', () => {
  it('testa se existe uma caixa de email', () => {
    renderWithRouterAndRedux(<App />);
    const inputEmail = screen.getByRole('textbox');
    expect(inputEmail).toBeInTheDocument();
  });
  it('testa se existe uma caixa de senha', () => {
    renderWithRouterAndRedux(<App />);
    const inputSenha = screen.getByPlaceholderText(/senha/i);
    expect(inputSenha).toBeInTheDocument();
  });
  it('testa se existe um botão', () => {
    renderWithRouterAndRedux(<App />);
    const button = screen.getByRole('button', { name: /entrar/i });
    expect(button).toBeInTheDocument();
  });
  it('testa se ao clicar no botão é redirecionado para pagina carteira', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const inputEmail = screen.getByRole('textbox');
    const inputSenha = screen.getByPlaceholderText(/senha/i);
    const button = screen.getByRole('button', { name: /entrar/i });
    userEvent.type(inputEmail, 'email@email.com');
    userEvent.type(inputSenha, '123456');
    userEvent.click(button);
    expect(history.location.pathname).toBe('/carteira');
  });
});
