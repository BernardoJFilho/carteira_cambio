import React from 'react';
import { Center, Stack, Title } from '@mantine/core';
import Header from '../components/Header';
import WalletForm from '../components/WalletForm';
import Tabela from '../components/Tabela';

class Wallet extends React.Component {
  render() {
    return (
      <Stack spacing="0">
        <Center maw="50%" mx="auto">
          <Title order={ 1 } style={ { fontFamily: 'Fira-code' } }>Carteira</Title>
        </Center>
        <Header />
        <WalletForm />
        <Tabela />
      </Stack>
    );
  }
}

export default Wallet;
