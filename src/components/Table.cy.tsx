import React from 'react';
import { Table } from './Table';

describe('<Table />', () => {
  it('renders', () => {
    const crew = [
      {
        id: '1',
        name: 'foo',
        agency: 'NASA',
        image: 'https://i.imgur.com/U7o2UX1.png',
        wikipedia: 'www.test.com', // not used
        launches: ['1', '2'], // not used
        status: 'active', // not used
      },
    ];

    cy.mount(<Table crew={crew} />);
  });

  it('has correct data', () => {
    const crew = [
      {
        id: '1',
        name: 'foo',
        agency: 'NASA',
        image: 'https://i.imgur.com/U7o2UX1.png',
        wikipedia: 'www.test.com', // not used
        launches: ['1', '2'], // not used
        status: 'active', // not used
      },
    ];

    cy.mount(<Table crew={crew} />);

    cy.get('[data-testid="crew-name"]').contains('foo');
    cy.get('[data-testid="crew-agency"]').contains('NASA');
    cy.get('[data-testid="crew-link"]').contains('www.test.com');
  });
});
