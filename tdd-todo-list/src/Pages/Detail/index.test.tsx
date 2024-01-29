import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, useLocation } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import 'jest-styled-components';

import { Detail } from './index';
import { List } from 'Pages/List';
import { NotFound } from 'Pages/NotFound';

describe('<Detail />', () => {
  it('renders component correctly', () => {
    localStorage.setItem('ToDoList', JSON.stringify(['ToDo 1', 'ToDo 2']));

    const { container } = render(
      <MemoryRouter initialEntries={['/detail/1']}>
        <Routes>
          <Route path="/detail/:id" element={<Detail />} />
        </Routes>
      </MemoryRouter>,
    );

    const toDoItem = screen.getByText('ToDo 2');
    expect(toDoItem).toBeInTheDocument();

    const button = screen.getByText('삭제');
    expect(button).toBeInTheDocument();

    expect(container).toMatchSnapshot();
  });

  it('redirect to Not Found page if todo id is wrong', () => {
    localStorage.clear();

    const TestComponent = () => {
      const { pathname } = useLocation();
      return <div>{pathname}</div>;
    };

    render(
      <MemoryRouter initialEntries={['/detail/1']}>
        <TestComponent />
        <Routes>
          <Route path="/detail/:id" element={<Detail />} />
          <Route path="/NotFound" element={<NotFound />} />
        </Routes>
      </MemoryRouter>,
    );

    const url = screen.getByText('/NotFound');
    expect(url).toBeInTheDocument();
  });

  it('delete a ToDo and redirect to the List page', () => {
    localStorage.setItem('ToDoList', JSON.stringify(['ToDo 1', 'ToDo 2']));

    const TestComponent = () => {
      const { pathname } = useLocation();
      return <div>{pathname}</div>;
    };

    render(
      <MemoryRouter initialEntries={['/detail/1']}>
        <TestComponent />
        <Routes>
          <Route path="/" element={<List />} />
          <Route path="/detail/:id" element={<Detail />} />
        </Routes>
      </MemoryRouter>,
    );
    const button = screen.getByText('삭제');
    fireEvent.click(button);

    expect(JSON.parse(localStorage.getItem('ToDoList') as string)).not.toContain('ToDo 2');
  });
});
