import React from 'react';
import { SearchBar } from './SearchBar';

describe('<SearchBar />', () => {
  it('renders', () => {
    cy.mount(<SearchBar onChange={() => {}} />);
  });
});
