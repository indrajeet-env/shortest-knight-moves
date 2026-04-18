import React from 'react';
import Square from './Square';

const Board = ({ start, end, path, knightPos, onSquareClick }) => {
  const renderSquare = (r, c) => {
    const isLight = (r + c) % 2 === 0;
    const isStart = start && start.r === r && start.c === c;
    const isEnd = end && end.r === r && end.c === c;
    const isPath = path.some(p => p.r === r && p.c === c);
    const hasKnight = knightPos && knightPos.r === r && knightPos.c === c;

    return (
      <Square
        key={`${r}-${c}`}
        isLight={isLight}
        isStart={isStart}
        isEnd={isEnd}
        isPath={isPath}
        hasKnight={hasKnight}
        onClick={() => onSquareClick(r, c)}
      />
    );
  };

  const rows = [];
  for (let r = 0; r < 8; r++) {
    for (let c = 0; c < 8; c++) {
      rows.push(renderSquare(r, c));
    }
  }

  return (
    <div className="board">
      {rows}
    </div>
  );
};

export default Board;
