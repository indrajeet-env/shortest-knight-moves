import React, { useState, useEffect, useCallback } from 'react';
import Board from './components/Board';
import Controls from './components/Controls';
import './index.css';

const App = () => {
  const [start, setStart] = useState(null); // { r, c }
  const [end, setEnd] = useState(null);
  const [path, setPath] = useState([]); // Array of { r, c }
  const [moves, setMoves] = useState(0);
  const [knightPos, setKnightPos] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [status, setStatus] = useState('Select start square');

  const indexToNotation = (r, c) => {
    const files = 'abcdefgh';
    return `${files[c]}${8 - r}`;
  };

  const notationToIndex = (notation) => {
    const files = 'abcdefgh';
    const c = files.indexOf(notation[0]);
    const r = 8 - parseInt(notation[1]);
    return { r, c };
  };

  const handleSquareClick = (r, c) => {
    if (isAnimating) return;

    if (!start) {
      setStart({ r, c });
      setKnightPos({ r, c });
      setStatus('Select end square');
    } else if (!end && (start.r !== r || start.c !== c)) {
      setEnd({ r, c });
      setStatus('Ready to find path');
    }
  };

  const reset = () => {
    setStart(null);
    setEnd(null);
    setPath([]);
    setMoves(0);
    setKnightPos(null);
    setIsAnimating(false);
    setStatus('Select start square');
  };

  const findPath = async () => {
    if (!start || !end) return;

    setStatus('Finding shortest path...');
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8080';
      const response = await fetch(`${apiUrl}/knight-path`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          start: indexToNotation(start.r, start.c),
          end: indexToNotation(end.r, end.c),
        }),
      });

      if (!response.ok) throw new Error('API call failed');

      const data = await response.json();
      const pathIndices = data.path.map(notationToIndex);

      setMoves(data.moves);
      animatePath(pathIndices);
    } catch (error) {
      console.error(error);
      setStatus('Error: Backend not reachable');
    }
  };

  const animatePath = async (pathIndices) => {
    setIsAnimating(true);
    setStatus('Animating knight...');

    // We start from the first move in the path (excluding start which is index 0)
    for (let i = 0; i < pathIndices.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 300));
      setKnightPos(pathIndices[i]);
      setPath(prev => [...prev, pathIndices[i]]);
    }

    setIsAnimating(false);
    setStatus('Path found!');
  };

  return (
    <div className="container">
      <h1 className="title">Knight's Path Visualizer</h1>

      <div className="board-container">
        <Board
          start={start}
          end={end}
          path={path}
          knightPos={knightPos}
          onSquareClick={handleSquareClick}
        />
      </div>

      <Controls
        onFindPath={findPath}
        onReset={reset}
        moves={moves}
        status={status}
        disabled={!start || !end || isAnimating}
      />
    </div>
  );
};

export default App;
