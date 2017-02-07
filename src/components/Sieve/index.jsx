import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';
import { generateRange, findNextP, getPrimesIn } from '../../utils/sieve.js';
import SieveRow from './helpers.jsx';

const CELLS_PER_ROW = 10;
const COLORS = {
  2: 'red',
  3: 'green',
  5: 'blue',
  7: 'yellow',
  // everything else is 'purple'
};

class SieveGrid extends Component {
  constructor(props) {
    super(props);

    const range = generateRange(2, props.n);

    this.state = {
      p: 2,
      range,
      primes: null
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
        this.setState({ primes: getPrimesIn(this.state.range) });
        clearTimeout(timeout);
      } else {
        const { p } = this.state;
        let _color;

        for (let num in COLORS) {
          if (p % +num === 0) {
            _color = COLORS[num];
            break;
          }
        }

        const color = _color || 'purple';
        this.mark(p, color, next.bind(this));
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
    const { p, range, primes } = this.state;

    const rows = [];
    let i = 2;
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

    return (
      <div>
        <Grid celled>
          {rows}
        </Grid>
        {!!primes ? primes.join(', ') : null}
      </div>
    );
  }
}

export default SieveGrid;
