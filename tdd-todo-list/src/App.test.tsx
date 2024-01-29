import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';
import { Route, Routes, MemoryRouter } from 'react-router-dom';
import 'jest-styled-components';

describe('<App />', () => {
  it('renders component correctly', () => {
    localStorage.setItem('ToDoList', JSON.stringify(['ToDo 1', 'ToDo 2', 'ToDo 3']));

    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>,
    );

    const header = screen.getByText('할 일 목록');
    expect(header).toBeInTheDocument();

    const toDoItem1 = screen.getByText('ToDo 1');
    expect(toDoItem1).toBeInTheDocument();
    expect(toDoItem1).toHaveAttribute('href', '/detail/0');

    const toDoItem2 = screen.getByText('ToDo 2');
    expect(toDoItem2).toBeInTheDocument();
    expect(toDoItem2).toHaveAttribute('href', '/detail/1');

    const toDoItem3 = screen.getByText('ToDo 3');
    expect(toDoItem3).toBeInTheDocument();
    expect(toDoItem3).toHaveAttribute('href', '/detail/2');

    expect(screen.getAllByText('삭제').length).toBe(3);

    const label = screen.getByText('+');
    expect(label).toBeInTheDocument();
  });

  it('deletes toDo item', () => {
    localStorage.setItem('ToDoList', JSON.stringify(['ToDo 1', 'ToDo 2', 'ToDo 3']));

    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>,
    );

    const toDoItem = screen.getByText('ToDo 2');
    expect(toDoItem).toBeInTheDocument();

    fireEvent.click(toDoItem.nextElementSibling as HTMLElement);

    expect(toDoItem).not.toBeInTheDocument();
    expect(JSON.parse(localStorage.getItem('ToDoList') as string)).not.toContain('ToDo 2');
  });

  it('go to Add page and go back to List page', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>,
    );

    const addButton = screen.getByText('+');
    fireEvent.click(addButton);

    const header = screen.getByText('할 일 추가');
    expect(header).toBeInTheDocument();
    const input = screen.getByPlaceholderText('할 일을 입력해 주세요');
    expect(input).toBeInTheDocument();
    const button = screen.getByText('추가');
    expect(button).toBeInTheDocument();
    const goBack = screen.getByText('돌아가기');
    expect(goBack).toBeInTheDocument();
    fireEvent.click(goBack);

    expect(header.textContent).toBe('할 일 목록');
    expect(addButton.textContent).toBe('+');
  });

  it('adds a new ToDo', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>,
    );

    const addButton = screen.getByText('+');
    fireEvent.click(addButton);

    const input = screen.getByPlaceholderText('할 일을 입력해 주세요');
    const button = screen.getByText('추가');

    fireEvent.change(input, { target: { value: 'New ToDo' } });
    fireEvent.click(button);

    const header = screen.getByText('할 일 목록');
    expect(header).toBeInTheDocument();
    const newToDo = screen.getByText('New ToDo');
    expect(newToDo).toBeInTheDocument();
    expect(JSON.parse(localStorage.getItem('ToDoList') as string)).toContain('New ToDo');
  });

  it('go to Detail page and go back to List page', () => {
    localStorage.setItem('ToDoList', JSON.stringify(['ToDo 1']));

    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>,
    );

    const toDoItem = screen.getByText('ToDo 1');
    expect(toDoItem).toBeInTheDocument();
    fireEvent.click(toDoItem);

    const header = screen.getByText('할 일 상세');
    expect(header).toBeInTheDocument();
    const toDo = screen.getByText('ToDo 1');
    expect(toDo).toBeInTheDocument();
    const button = screen.getByText('삭제');
    expect(button).toBeInTheDocument();

    const goBack = screen.getByText('돌아가기');
    expect(goBack).toBeInTheDocument();
    fireEvent.click(goBack);

    expect(header.textContent).toBe('할 일 목록');
  });

  it('delete ToDo from the detail page', () => {
    localStorage.setItem('ToDoList', JSON.stringify(['ToDo 1']));

    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>,
    );

    const toDoItem = screen.getByText('ToDo 1');
    expect(toDoItem).toBeInTheDocument();

    fireEvent.click(toDoItem);
    const header = screen.getByText('할 일 상세');
    expect(header).toBeInTheDocument();
    const deleteButton = screen.getByText('삭제');
    fireEvent.click(deleteButton);

    expect(header.textContent).toBe('할 일 목록');
    expect(toDoItem).not.toBeInTheDocument();
    expect(localStorage.getItem('ToDoList')).toBe('[]');
  });

  it('shows NotFound page if the user enters the wrong URL, and go back to List page', () => {
    render(
      <MemoryRouter initialEntries={['/wrong']}>
        <App />
      </MemoryRouter>,
    );

    const header = screen.getByText('에러');
    expect(header).toBeInTheDocument();
    const notFoundMessage = screen.getByText('Not Found 🐯');
    expect(notFoundMessage).toBeInTheDocument();
    const goBack = screen.getByText('돌아가기');
    expect(goBack).toBeInTheDocument();
    fireEvent.click(goBack);

    expect(header.textContent).toBe('할 일 목록');
  });
});
