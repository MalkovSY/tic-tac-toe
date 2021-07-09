import React from 'react';
import Board from '../board/Board';

import './game.css';

export default class Game extends React.Component {

  state = {
    history: [{
      squares: Array(9).fill(null)
    }],
      xisNext: true,
      stepNumber: 0
  }

  handleClick = (i) => {
    const history = this.state.history.slice(0, this.state.stepNumber + 1),
          current = history[history.length - 1],
          newSquares = current.squares.slice();

    if (calculateWinner(newSquares) || newSquares[i]) {
      return;
    }

    newSquares[i] = this.state.xisNext ? 'X' : 'O';

    this.setState({
      history: history.concat([{
        squares: newSquares
      }]),
      stepNumber: history.length,
      xisNext: !this.state.xisNext});
  };

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xisNext: (step % 2) === 0
    });
  };

    render() {
      const history = this.state.history,
            current = history[this.state.stepNumber],
            winner = calculateWinner(current.squares);
      let status;

      if(winner) {
        status = 'Победа игрока ' + winner;
      } else {
        status = `Следущий ход: ${this.state.xisNext ? 'X' : 'O'}`;
      }

      const moves = history.map((step, move) => {
        const desc = move ? 
          'Перейти к ходу №' + move :
          'К началу игры';
        return (
          <li className='step' key={move}>
            <button 
              onClick={() => this.jumpTo(move)}
              className='step'>{desc}</button>
          </li>
        );
      });

      return (
        <div className="game">
          <div className="game-board">
            <Board 
              squares={current.squares}
              handleClick={(i) => this.handleClick(i)}/>
          </div>
          <div className="game-info">
            <div className='status' >{status}</div>
            <ol>{moves}</ol>
          </div>
        </div>
      );
    }
  }

  function calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }