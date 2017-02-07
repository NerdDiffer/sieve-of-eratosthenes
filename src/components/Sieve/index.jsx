import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';
import { generateRange, findNextP, getPrimesIn } from '../../utils/sieve.js';
import SieveRow from './Row.jsx';
import ListOfPrimes from './ListOfPrimes.jsx';

const CELLS_PER_ROW = 10;
const P_INIT = 2;
const COLORS = {
  2: 'red',
  3: 'green',
  5: 'blue',
  7: 'yellow',
};

const setColor = (p, colors) => {
  for (let num in colors) {
    if (p % +num === 0) { return colors[num]; }
  }

  return 'purple';
};

class SieveGrid extends Component {
  constructor(props) {
    super(props);

    const range = generateRange(2, props.n);

    this.state = {
      p: P_INIT,
      range,
      primes: null
    };
  }

  componentDidMount() {
    this.findPrimes();
  }

  markMultiplesOf = (pInit, color, next) => {
    let p = pInit * 2;
    const { n, ms } = this.props;

    const boundUpdate = update.bind(this);
    let timeout = setTimeout(boundUpdate, ms)

    function update() {
      if (p > n) {
        clearTimeout(timeout);
        next(pInit);
      } else {
        const newRange = Object.assign({}, this.state.range, { [p]: color });

        this.setState(
          { range: newRange, p: p + pInit },
          function onSetState() {
            p = this.state.p;
            timeout = setTimeout(boundUpdate, ms);
          }
        );
      }
    }
  }

  findPrimes = () => {
    const { ms } = this.props;

    const boundMarkP = markP.bind(this);
    const boundNextP = nextP.bind(this);

    let timeout = setTimeout(boundMarkP, ms);

    function markP() {
      if (this.state.p === null) {
        this.setState({ primes: getPrimesIn(this.state.range) });
        clearTimeout(timeout);
      } else {
        const { p } = this.state;
        const color = setColor(p, COLORS);
        this.markMultiplesOf(p, color, boundNextP);
      }
    }

    function nextP(pInit) {
      this.setState(
        prevState => ({ p: findNextP(prevState.range, pInit) }),
        () => timeout = setTimeout(boundMarkP, ms)
      );
    }
  }

  generateRows = () => {
    const { n } = this.props;
    const { range } = this.state;

    const rows = [];
    let i = P_INIT;
    let row;

    while (i < n) {
      row = (
        <SieveRow
          key={i}
          start={i}
          rowLen={CELLS_PER_ROW}
          range={range}
        />
      );
      rows.push(row);
      i += CELLS_PER_ROW;
    }

    return rows;
  }

  render() {
    const { primes } = this.state;
    const rows = this.generateRows();

    return (
      <div className="sieveGrid">
        <Grid celled>
          {rows}
        </Grid>
        {!!primes ? <ListOfPrimes list={primes} n={this.props.n} /> : null}
      </div>
    );
  }
}

export default SieveGrid;
