import React from 'react';
import Styled from 'styled-components';

import { PageHeader } from 'Components/PageHeader';
import { Button } from 'Components/Button';
import { Add, List } from 'Pages';

const Container = Styled.div`
  min-height: 100vh;
  background-color: #EEEEEE;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

function App() {
  return (
    <Container>
      <PageHeader />
      <List />
      <Add />
    </Container>
  );
}

export default App;
