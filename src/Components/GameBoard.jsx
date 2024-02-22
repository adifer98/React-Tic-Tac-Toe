export default function GameBoard({onSquareSelection, board}) {

    /*const [ gameBoard, setGameBoard ] = useState(initialBoard);

    function handleSelect(row, col) {
        setGameBoard(oldBoard => {
            const newBoard = [...oldBoard.map(innerArray => [...innerArray])];
            newBoard[row][col] = activePlayer;
            return newBoard;
        });
        onSquareSelection();
    }*/

    return (
        <ol id="game-board">
            {board.map((row, rowIndex) =>
                <li key={rowIndex}>
                    <ol>
                        {row.map((playerSymbol, colIndex) =>
                            <li key={colIndex}>
                                <button onClick={() => onSquareSelection(rowIndex, colIndex)}
                                    disabled={playerSymbol !== null}>
                                        {playerSymbol}
                                </button>
                            </li>
                        )}
                    </ol>
                </li>
            )}
        </ol>

    )
}