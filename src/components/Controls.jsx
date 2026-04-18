import React from 'react';

const Controls = ({ onFindPath, onReset, moves, status, disabled }) => {
  return (
    <div className="controls">
      <div className="info-panel">
        <div className="moves-count">
          Shortest Path: <span>{moves || '--'}</span> moves
        </div>
        <div className="status-text">{status}</div>
      </div>

      <div className="button-group">
        <button
          className="primary"
          onClick={onFindPath}
          disabled={disabled}
        >
          Find Shortest Path
        </button>
        <button
          className="secondary"
          onClick={onReset}
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default Controls;
