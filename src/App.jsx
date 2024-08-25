import { useState } from 'react';
import Player from "./Components/Player.jsx";
import GameBoard from "./Components/GameBoard.jsx";
import Log from "./Components/Log.jsx";
import GameOver from "./Components/GameOver.jsx";
import { WINNING_COMBINATIONS } from './winning-combinations.js'


const INITIAL_BOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null]
];

const PLAYERS_INITIAL_NAMES = {
  X: "player 1",
  O: "player 2"
}

function getActivePlayer(turns) {
  let currentPlayer = 'X';
  if (turns.length > 0 && turns[0].player === 'X') {
    currentPlayer = 'O';
  }
  return currentPlayer;
}

function getGameBoard(gameTurns) {
  const gameBoard = [...INITIAL_BOARD.map(innerArray =>[...innerArray])];


  for (const turn of gameTurns) {
    const {square, player} = turn;
    const {row, col} = square;

    gameBoard[row][col] = player;
  }
  return gameBoard;
}

function getWinner(gameBoard, playersNames) {
  for (const combination of WINNING_COMBINATIONS) {
    const firstSymbol = gameBoard[combination[0].row][combination[0].column];
    const secondSymbol = gameBoard[combination[1].row][combination[1].column];
    const thirdSymbol = gameBoard[combination[2].row][combination[2].column];

    if (firstSymbol && firstSymbol === secondSymbol && firstSymbol === thirdSymbol) {
      return playersNames[firstSymbol];
    }
  }
  return undefined;
}

function App() {
  const [ gameTurns, setGameTurns ] = useState([]);
  const [ playersNames, setPlayersNames ] = useState(PLAYERS_INITIAL_NAMES);

  const activePlayer = getActivePlayer(gameTurns);

  const gameBoard = getGameBoard(gameTurns);

  const winner = getWinner(gameBoard, playersNames);

  const hasDraw = (gameTurns.length === 9 && !winner);

  function handleSquareSelection(rowIndex, colIndex) {
    setGameTurns(oldArray => {
      const currentPlayer = getActivePlayer(oldArray);
      const updatedTurns = [
        {
          square: { row: rowIndex, col: colIndex},
          player: currentPlayer,
          playersName: playersNames[currentPlayer]
        }, ...oldArray
      ];

      return updatedTurns;
    });
  }

  function handleRematch() {
    setGameTurns([]);
  }

  function handleNameChange(symbol, newName) {
    setPlayersNames(players => {
      const updatedPlayers = {...players, [symbol]: newName};
      return updatedPlayers;
    })
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player initialName={PLAYERS_INITIAL_NAMES.X} symbol="X" isActive={activePlayer === 'X'} onNameChange={handleNameChange}/>
          <Player initialName={PLAYERS_INITIAL_NAMES.O} symbol="O" isActive={activePlayer === 'O'} onNameChange={handleNameChange}/>
        </ol>
        {(winner || hasDraw) && <GameOver winner={winner} onRematch={handleRematch} />}
        <GameBoard onSquareSelection={handleSquareSelection} board={gameBoard} />
      </div>
      <Log turns = {gameTurns} />
    </main>
  )
}

export default App
