import React from 'react';
import { Dropdown } from './Dropdown';

describe('<Dropdown />', () => {
  it('renders', () => {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    cy.mount(<Dropdown onChange={() => {}} />);
  });

  it('clicks NASA', () => {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    cy.mount(<Dropdown onChange={() => {}} />);

    cy.get('[data-testid="dropdown-button"]').click();
    cy.get('[data-testid="NASA"]').click();
  });
});
