import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';
import { generateRange, findNextP, getPrimesIn } from '../../utils/sieve.js';
import { SieveCell, SieveRow, renderRows } from './helpers.jsx';

const CELLS_PER_ROW = 10;

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

    const rows = renderRows(1, n, CELLS_PER_ROW);

    return (
      <Grid celled>
        {rows}
      </Grid>
    );
  }
}

export default SieveGrid;
