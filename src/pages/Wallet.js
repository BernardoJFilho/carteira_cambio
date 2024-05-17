import React from 'react';
import { Center, Title } from '@mantine/core';
import Header from '../components/Header';
import WalletForm from '../components/WalletForm';
import Table from '../components/Table';

class Wallet extends React.Component {
  render() {
    return (
      <>
        <Center maw="50%" mx="auto">
          <Title order={ 1 } style={ { fontFamily: 'Fira-code' } }>Carteira</Title>
        </Center>
        <Header />
        <WalletForm />
        <Table />
      </>
    );
  }
}

export default Wallet;
