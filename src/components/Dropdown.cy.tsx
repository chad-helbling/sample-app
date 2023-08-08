import React from 'react';
import { Dropdown } from './Dropdown';

describe('<Dropdown />', () => {
  it('renders', () => {
    cy.mount(<Dropdown onChange={() => {}} />);
  });

  it('clicks NASA', () => {
    cy.mount(<Dropdown onChange={() => {}} />);

    cy.get('[data-testid="dropdown-button"]').click();
    cy.get('[data-testid="NASA"]').click();
  });
});
