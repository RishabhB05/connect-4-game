import React, { useState, useEffect } from "react";
import { Slot } from "./Slot";
import { useSocket } from "../context/SocketContext";

export const Board = ({ onLeaveRoom }) => {
    const {
        gameState,
        currentPlayer,
        gameOver,
        winner,
        players,
        makeMove,
        resetGame,
        playerName,
        leaveRoom,
        socket
    } = useSocket();

    const [board, setBoard] = useState(null);
    const [isMyTurn, setIsMyTurn] = useState(false);

    useEffect(() => {
        if (gameState) {
            setBoard(gameState.board);
            
            // Determine if it's the current player's turn based on their color
            const myColor = players.find(p => p.name === playerName)?.color;
            setIsMyTurn(myColor === currentPlayer);
        }
    }, [gameState, currentPlayer, playerName, players]);

    const handleClick = (e) => {
        if (!isMyTurn || gameOver || !socket) return;

        const column = parseInt(e.target.getAttribute('x'));
        makeMove(column);
    };

    if (!board || !gameState) {
        return <div className="board-loading">Loading game...</div>;
    }

    const myColor = players.find(p => p.name === playerName)?.color;
    const opponentColor = myColor === 'red' ? 'yellow' : 'red';
    const opponentName = players.find(p => p.color === opponentColor)?.name || 'Waiting...';

    return (
        <div className="game-container">
            <div className="game-header">
                <div className="player-info">
                    <div className="player-item my-player">
                        <div className="player-color" style={{ backgroundColor: myColor }}></div>
                        <div className="player-name">{playerName} (You)</div>
                    </div>
                    <div className="vs">vs</div>
                    <div className="player-item opponent-player">
                        <div className="player-color" style={{ backgroundColor: opponentColor }}></div>
                        <div className="player-name">{opponentName}</div>
                    </div>
                </div>
                
                {!gameOver && (
                    <h2 id='playerDisplay' className={isMyTurn ? 'my-turn' : 'opponent-turn'}>
                        {isMyTurn ? 'Your Turn' : `${opponentName}'s Turn`}
                    </h2>
                )}
            </div>

            {gameOver && (
                <div className="game-over-message">
                    <h2>Game Over!</h2>
                    {winner ? (
                        <p className="winner-text">
                            {winner === myColor ? `🎉 You Win! 🎉` : `${opponentName} Wins!`}
                        </p>
                    ) : (
                        <p className="draw-text">It's a Draw!</p>
                    )}
                </div>
            )}

            <div 
                id='board'
                className="board-grid"
                onClick={!gameOver && isMyTurn ? handleClick : null}
                style={{ cursor: isMyTurn && !gameOver ? 'pointer' : 'default' }}
            >
                {board.map((row, i) => {
                    return row.map((ch, j) => (
                        <Slot key={`${i}-${j}`} ch={ch} y={i} x={j} />
                    ));
                })}
            </div>

            <div className="game-controls">
                {gameOver && (
                    <button onClick={resetGame} className="btn btn-primary">
                        Play Again
                    </button>
                )}
                <button 
                    onClick={() => {
                        leaveRoom();
                        onLeaveRoom();
                    }} 
                    className="btn btn-secondary"
                >
                    Leave Room
                </button>
            </div>
        </div>
    );
};