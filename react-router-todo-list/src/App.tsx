import React, { useState } from "react";
import Styled from "styled-components";

import { Routes, Route } from "react-router-dom";

import { ToDoListProvider } from "Contexts";

import { List, Add, Detail, NotFound } from "Pages";
import { InputContainer, PageHeader, ToDoList } from "Components";

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
    <ToDoListProvider>
      <Container>
        <PageHeader />
        <Routes>
          <Route path="/" element={<List />}></Route>
          <Route path="/add" element={<Add />}></Route>
          <Route path="detail/:id" element={<Detail />}></Route>
          <Route path="*" element={<NotFound />}></Route>
        </Routes>
      </Container>
    </ToDoListProvider>
  );
}

export default App;
