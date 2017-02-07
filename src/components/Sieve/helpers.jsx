import React from 'react';
import { Grid } from 'semantic-ui-react';

const SieveCell = ({ number }) => {
  return (
    <Grid.Column width={1}>
      {number}
    </Grid.Column>
  )
};

const SieveRow = ({ start, rowLen }) => {
  const cells = [];

  const end = start + rowLen;

  for (let i = start; i < end; i += 1) {
    cells.push(<SieveCell key={i} number={i} />);
  }

  return (<Grid.Row>{cells}</Grid.Row>);
};

const renderRows = (start, end, rowLen) => {
  const rows = [];
  let i = start;
  let row;

  while (i < end) {
    row = (<SieveRow key={i} start={i} rowLen={rowLen} />);
    rows.push(row);
    i += rowLen;
  }

  return rows;
};

export { SieveCell, SieveRow, renderRows };
