import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import 'jest-styled-components';

import { PageHeader } from './index';

import { BrowserRouter, MemoryRouter } from 'react-router-dom';

describe('<PageHeader />', () => {
  // render 함수
  const renderPageHeader = (path: string) => {
    render(
      <MemoryRouter initialEntries={[path]}>
        <PageHeader />
      </MemoryRouter>,
    );
  };

  it('renders component correctly', () => {
    const container = renderPageHeader('/');

    const label = screen.getByText('할 일 목록');
    expect(label).toBeInTheDocument();
    const goBack = screen.queryByText('돌아가기');
    expect(goBack).not.toBeInTheDocument();

    expect(container).toMatchSnapshot();
  });

  it('rendes component correctly with /add URL', () => {
    const container = renderPageHeader('/add');

    const label = screen.getByText('할 일 추가');
    expect(label).toBeInTheDocument();
    const goBack = screen.getByText('돌아가기');
    expect(goBack).toBeInTheDocument();
    expect(goBack.getAttribute('href')).toBe('/');

    expect(container).toMatchSnapshot();
  });

  it('renders component correctly with /detail/:id URL', () => {
    renderPageHeader('/detail/1');

    const label = screen.getByText('할 일 상세');
    expect(label).toBeInTheDocument();
    const goBack = screen.getByText('돌아가기');
    expect(goBack).toBeInTheDocument();
    expect(goBack.getAttribute('href')).toBe('/');
  });

  it('renders component correctly with NotFound', () => {
    renderPageHeader('/not-found');

    const label = screen.getByText('에러');
    expect(label).toBeInTheDocument();
    const goBack = screen.getByText('돌아가기');
    expect(goBack).toBeInTheDocument();
    expect(goBack.getAttribute('href')).toBe('/');
  });

  it('renders component correctly with goBack link', () => {
    renderPageHeader('/not-found');

    const goBack = screen.getByText('돌아가기');
    fireEvent.click(goBack);

    const label = screen.getByText('할 일 목록');
    expect(label).toBeInTheDocument();
    expect(goBack).not.toBeInTheDocument();
  });
});
