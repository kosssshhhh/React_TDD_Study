import React from 'react';
import Styled from 'styled-components';

import { useNavigate, useLocation } from 'react-router-dom';
import path from 'path';
import { Link } from 'react-router-dom';

const Container = Styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #1E40FF;
`;
const Title = Styled.div`
  padding: 20px;
  color: #FFFFFF;
  font-size: 20px;
  font-weight: 600;
`;
const GoBack = Styled(Link)`
  padding: 20px; 
  color: #FFFFFF;
  font-size: 16px;
  font-weight: 600;
  text-decoration: none;
  position: absolute;
  left: 20px
`;

export const PageHeader = () => {
  const { pathname } = useLocation();

  let title = '에러';

  if (pathname === '/') {
    title = '할 일 목록';
  } else if (pathname === '/add') {
    title = '할 일 추가';
  } else if (pathname.startsWith('/detail')) {
    title = '할 일 상세';
  }
  return (
    <Container>
      {pathname !== '/' && <GoBack to="/">돌아가기</GoBack>}
      <Title>{title}</Title>
    </Container>
  );
};
