import React from 'react';
import Knight from './Knight';

const Square = ({ isLight, isStart, isEnd, isPath, hasKnight, onClick }) => {
  const className = `square ${isLight ? 'light' : 'dark'} ${isStart ? 'start' : ''} ${isEnd ? 'end' : ''} ${isPath ? 'path-highlight' : ''}`;

  return (
    <div className={className} onClick={onClick}>
      {hasKnight && <Knight />}
    </div>
  );
};

export default Square;
