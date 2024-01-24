import React, { useState } from 'react';
import styled from 'styled-components';

import { Button } from 'Components/Button';
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
  display: flex;
`;
const Input = styled.input`
  font-size: 16px;
  padding: 10px 10px;
  border-radius: 8px;
  border: 1px solid #bdbdbd;
  outline: none;
`;

export const Add = () => {
  const navigate = useNavigate();

  const [toDo, setToDo] = useState('');

  const addToDo = (): void => {
    if (!toDo) return;

    const list = JSON.parse(localStorage.getItem('ToDoList') || '[]');
    localStorage.setItem('ToDoList', JSON.stringify([...list, toDo]));

    navigate('/');
  };

  return (
    <Container>
      <Input placeholder="할 일을 입력해 주세요" onChange={(e) => setToDo(e.target.value)} />
      <Button label="추가" onClick={addToDo} />
    </Container>
  );
};
