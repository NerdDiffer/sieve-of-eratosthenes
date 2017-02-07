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
    this.iterate();
  }

  // mark the prime numbers with a darker shade of a color.
  // mark the non-prime numbers within the same sequence with a lighter shade of color.
  mark = (pInit, color, next) => {
    let p = pInit * 2;
    const { n, ms } = this.props;

    let timeout = setTimeout(update.bind(this), ms)

    function update() {
      if (p > n) {
        clearTimeout(timeout);
        next(pInit);
      } else {
        const newRange = Object.assign({}, this.state.range, { [p]: color });

        this.setState({
          range: newRange,
          p: p + pInit
        }, function onSetState() {
          p = this.state.p;
          if (p === undefined) { throw new Error('p is undefined'); }
          timeout = setTimeout(update.bind(this), ms);
        });
      }
    }
  }

  iterate = () => {
    const { ms } = this.props;

    let timeout = setTimeout(markP.bind(this), ms);

    function markP() {
      if (this.state.p === null) {
        console.log(getPrimesIn(this.state.range));
        clearTimeout(timeout);
      } else {
        this.mark(this.state.p, 'blue', next.bind(this));
      }
    }

    function next(pInit) {
      this.setState(function setNextP(prevState) {
        return { p: findNextP(prevState.range, pInit) };
      }, function onSetState() {
        timeout = setTimeout(markP.bind(this), ms);
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
