import React from 'react';
import Styled from 'styled-components';

import { PageHeader } from 'Components/PageHeader';
import { Button } from 'Components/Button';
import { Add, List, Detail, NotFound } from 'Pages';
import { Route, Routes } from 'react-router-dom';

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
      {/* <List /> */}
      <Routes>
        <Route path="/" element={<List />} />
        <Route path="/add" element={<Add />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Container>
  );
}

export default App;
