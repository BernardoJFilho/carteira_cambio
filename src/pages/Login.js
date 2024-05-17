import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { PasswordInput, Stack, TextInput, Button, Title } from '@mantine/core';
import { submitLoginForm } from '../redux/actions';

class Login extends React.Component {
  state = {
    email: '',
    valorPassword: '',
    buttonDisable: true,
    toggle: false,
  };

  validarEmail = (email) => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
  };

  stateButton = ({ target }) => {
    const { email, valorPassword } = this.state;
    const { value } = target;
    const minSenha = 6;
    const sliceNumber = -1;
    this.setState({
      buttonDisable: true,
      [target.name]: value,
    });
    if (value.length >= minSenha && this.validarEmail(email)
      && value.slice(0, sliceNumber) === valorPassword) {
      this.setState({
        buttonDisable: false,
        [target.name]: value,
      });
    }
  };

  buttonClick = () => {
    const { history, dispatch } = this.props;
    const { email } = this.state;
    dispatch(submitLoginForm(email));
    history.push('/carteira');
  };

  render() {
    const { email, buttonDisable, valorPassword, toggle } = this.state;
    return (
      <Stack align="center" justify="center" style={ { height: '100vh' } }>
        <Stack
          justify="center"
          spacing="0"
          h={ 200 }
          w={ 500 }
          maw={ 400 }
          mx="auto"
          style={ {
            border: '2px solid blue',
            borderRadius: '10px',
          } }
        >
          <Title order={ 3 } align="center">TrybeWallet</Title>
          <TextInput
            name="email"
            value={ email }
            type="text"
            data-testid="email-input"
            placeholder="@email.com"
            onChange={ this.stateButton }
          />
          <PasswordInput
            name="valorPassword"
            placeholder="password"
            value={ valorPassword }
            data-testid="password-input"
            onChange={ this.stateButton }
            onVisibilityChange={ toggle }
          />
          <Button
            // variant="light"
            color="cyan"
            disabled={ buttonDisable }
            onClick={ this.buttonClick }
          >
            Entrar
          </Button>
        </Stack>
      </Stack>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect()(Login);
