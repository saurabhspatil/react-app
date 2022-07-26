import { render, screen, unmountComponentAtNode } from '@testing-library/react';
import { MemoryRouter } from "react-router-dom";
import App from './App';
import AppContainer from './components/mainContainer';
import CoinDetails  from './components/coinDetails';
// app.test.js
it("navigates home", () => {
  // in a real test a renderer like "@testing-library/react"
  // would take care of setting up the DOM elements
  const root = document.createElement('div');
  document.body.appendChild(root);

  // Render app
  render(
    <MemoryRouter initialEntries={['/']}>
      <AppContainer />
    </MemoryRouter>,
    root
  );

  // Check correct page content showed up
  expect(document.body.textContent).toBe('');
});

it("navigates Id page", () => {
  // in a real test a renderer like "@testing-library/react"
  // would take care of setting up the DOM elements
  const root = document.createElement('div');
  document.body.appendChild(root);

  // Render app
  render(
    <MemoryRouter initialEntries={['/view-coin-details/:id']}>
      <CoinDetails />
    </MemoryRouter>,
    root
  );

  // Check correct page content showed up
  expect(document.body.textContent).toBe('Name: Symbol: Hashing algorithm: Description:Genesis Date: Back');
});