import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

    // class Square extends React.Component {
    //   constructor(props) {
    //         super(props);
    //         this.state = {
    //             value: null,
    //         };
    //     }
    //     render() {
    //     return (
    //         <button className="square" onClick={ () => this.props.onClick()}>
    //         {this.props.value}
    //         </button>
    //     );
    //     }
    // }

  function Square(props) {
      return (
          <button className="square" onClick={props.onClick}>
              {props.value}
          </button>
      )
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

      for (let line of lines) {
          const [a,b,c] = line;
          if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
              return squares[a]
          }
      }
      return undefined
  }
  
  class Board extends React.Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         squares: Array(9).fill(null),
    //         turn: 'X',
    //         winner: undefined,
    //     };
    // }

    renderSquare(i) {
      return (
        <Square 
            value={this.props.squares[i]}
            onClick={() => this.props.onClick(i)}
        />
      );
    }
  
    render() {
      return (
        <div>
          <div className="board-row">
            {this.renderSquare(0)}
            {this.renderSquare(1)}
            {this.renderSquare(2)}
          </div>
          <div className="board-row">
            {this.renderSquare(3)}
            {this.renderSquare(4)}
            {this.renderSquare(5)}
          </div>
          <div className="board-row">
            {this.renderSquare(6)}
            {this.renderSquare(7)}
            {this.renderSquare(8)}
          </div>
        </div>
      );
    }
  }
  
  class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            history: [{
                squares: Array(9).fill(null),
            }],
            turn: 'X',
            winner: undefined,
            stepNumber: 0
        }
    }

    handleClick(i) {
        const squares = this.state.history[this.state.history.length - 1].squares.slice()
        if (squares[i] || this.state.winner ) { return }
        squares[i] = this.state.turn
        this.setState({ history: [...this.state.history,{ squares: squares }]})

        let winner = calculateWinner(squares)
        if (!winner) {
            this.setState({ turn: this.state.turn === 'X' ? 'O' : 'X'})
        } else {
            this.setState({ winner: winner })
        }
    }

    jumpTo(step) {
        const history = this.state.history.slice(0,step + 1)
        this.setState({
            stepNumber: step,
            turn: (step % 2) === 0 ? 'X' : 'O',
            history: history
        })
        console.log(history)
    }

    render() {
        const history = this.state.history
        const current = history[history.length - 1]
        // const winner = calculateWinner(current.squares)
        let status = !this.state.winner ? `Next player: ${this.state.turn}`: `${this.state.turn} won!`
        
        const moves = history.map((step, move) => {
            const desc = move ? `go to move # ${move}` : 'Go to game start'
            return (
                <li key={move}>
                    <button onClick={() => this.jumpTo(move)}>{desc}</button>
                </li>
            )
        })


      return (
        <div className="game">
          <div className="game-board">
            <Board squares={current.squares} onClick={(i) => this.handleClick(i)}/>
          </div>
          <div className="game-info">
            <div>{status}</div>
            <ol>{moves}</ol>
          </div>
        </div>
      );
    }
  }

//   class ListOfWords extends React.PureComponent {
//     render() {
//       return <div>{this.props.words.join(',')}</div>;
//     }
//   }
  
//   class WordAdder extends React.Component {
//     constructor(props) {
//       super(props);
//       this.state = {
//         words: ['marklar']
//       };
//       this.handleClick = this.handleClick.bind(this);
//     }
  
//     handleClick() {
//       this.setState({ words: [...this.state.words, 'marklar']})
//     }
  
//     render() {
//       return (
//         <div>
//           <button onClick={this.handleClick} />
//           <ListOfWords words={this.state.words} />
//         </div>
//       );
//     }
//   }
  // ========================================
  
  ReactDOM.render(
    <Game />,
    document.getElementById('root')
  );
  