import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';
import { generateRange, findNextP, getPrimesIn } from '../utils/sieve.js';

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
  constructor(props) {
    super(props);

    const range = generateRange(2, props.n);

    this.state = {
      p: 2,
      range
    };
  }

  componentDidMount() {
    this.iterate(1, 5);
  }

  iterate = (lo, hi) => {
    this.setState({ i: lo });
    const STOP = hi + 1;
    const { ms } = this.props;

    let timeout = setTimeout(test.bind(this), ms);

    function test() {
      if (this.state.i === STOP) { return clearTimeout(timeout); }

      this.setState((prevState, props) => (
        { i: prevState.i + 1 }
      ), function onSetState() {
        timeout = setTimeout(test.bind(this), ms);
      });
    }
  }

  render() {
    const { n } = this.props;

    const rows = renderRows(1, n);

    return (
      <Grid celled>
        {rows}
      </Grid>
    );
  }
}

export default SieveGrid;
