import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';

const CELLS_PER_ROW = 10;

const SieveCell = ({ number }) => {
  return (
    <Grid.Column width={1}>
      {number}
    </Grid.Column>
  )
};

const SieveRow = ({ start }) => {
  const cells = [];

  const end = start + CELLS_PER_ROW;

  for (let i = start; i < end; i += 1) {
    cells.push(<SieveCell key={i} number={i} />);
  }

  return (<Grid.Row>{cells}</Grid.Row>);
};

const renderRows = (start, end) => {
  const rows = [];
  let i = start;
  let row;

  while (i < end) {
    row = (<SieveRow key={i} start={i} />);
    rows.push(row);
    i += CELLS_PER_ROW;
  }

  return rows;
};

class SieveGrid extends Component {
  render() {
    const rows = renderRows(1, 100);

    return (
      <Grid celled>
        {rows}
      </Grid>
    );
  }
}

export default SieveGrid;
