import React from 'react';
import { Item } from 'semantic-ui-react';

const ListOfPrimes = props => {
  const header = `List of primes under ${props.n}`;
  return (
    <Item>
      <Item.Header>{header}</Item.Header>
      <Item.Description>{props.list.join(', ')}</Item.Description>
    </Item>
  );
};

export default ListOfPrimes;
