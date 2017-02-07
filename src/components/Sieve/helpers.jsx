import React from 'react';
import { Grid } from 'semantic-ui-react';

const SieveRow = ({ start, rowLen, range }) => {
  const cells = [];

  const end = start + rowLen;

  let color;

  for (let i = start; i < end; i += 1) {
    color = !!range[i] ? range[i] : null;

    cells.push(
      <Grid.Column key={i} width={1} color={color}>
        {i}
      </Grid.Column>
    );
  }

  return (
    <Grid.Row>
      {cells}
    </Grid.Row>
  );
};

export default SieveRow;
