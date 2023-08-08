import React from 'react';
import { PaginationBar } from './PaginationBar';

describe('<PaginationBar />', () => {
  it('renders', () => {
    cy.mount(
      <PaginationBar
        crewPerPage={10}
        totalCrew={30}
        visibleCrew={10}
        indexOfFirstCrew={0}
        currentPage={1}
        paginate={() => {}}
      />
    );
  });

  it('shows correct values', () => {
    cy.mount(
      <PaginationBar
        crewPerPage={10}
        totalCrew={30}
        visibleCrew={10}
        indexOfFirstCrew={0}
        currentPage={1}
        paginate={() => {}}
      />
    );

    cy.get('[data-testid="showing-first-value"]').contains(1);
    cy.get('[data-testid="showing-last-value"]').contains(10);
    cy.get('[data-testid="total-value"]').contains(30);
  });
});
