import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from 'Components/Button';

const Container = styled.div`
  display: flex;
  background-color: #ffffff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.2);
  align-items: center;
  flex-direction: column;
`;
const ToDo = styled.div`
  min-width: 350px;
  height: 350px;
  overflow-y: auto;
  border: 1px solid #bdbdbd;
  margin-bottom: 20px;
  padding: 10px;
`;

export const Detail = (): JSX.Element => {
  const { id } = useParams() as { id: string };
  const navigate = useNavigate();
  const toDoList = JSON.parse(localStorage.getItem('ToDoList') || '[]');

  const toDo = toDoList[id.toString()];

  const onDelete = () => {
    let list = [...toDoList];
    list.splice(Number.parseInt(id), 1);
    localStorage.setItem('ToDoList', JSON.stringify(list));
    navigate('/', { replace: true });
  };
  useEffect(() => {
    if (!toDo) {
      navigate('/NotFound', { replace: true });
    }
  }, [toDo, navigate]);
  return (
    <Container>
      <ToDo>{toDo}</ToDo>
      <Button label="삭제" backgroundColor="#FF1744" hoverColor="#F01440" onClick={onDelete} />
    </Container>
  );
};
