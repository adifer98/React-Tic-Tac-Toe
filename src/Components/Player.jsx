import { useState } from "react";

export default function Player({initialName, symbol, isActive, onNameChange}) {
    const [isEditing, setIsEditing] = useState(false);
    const [ playerName, setPlayerName ] = useState(initialName);

    let scriptedPlayerName = <span className="player-name">{playerName}</span>;
    if (isEditing) {
        scriptedPlayerName = <input type="text" required value={playerName}
            onChange={(event) => setPlayerName(event.target.value)} />
    }

    const btnCaption = isEditing ? "Save" : "Edit";

    function btnHandler() {
        setIsEditing(editing => !editing)
        if (isEditing) {
            onNameChange(symbol, playerName);
        }
    }

    return (
        <li className={isActive ? "active" : null}>
            <span className="player">
                {scriptedPlayerName}
                <span className="player-symbol">{symbol}</span>
            </span>
            <button onClick={btnHandler}> {btnCaption} </button>
        </li>
    );
}