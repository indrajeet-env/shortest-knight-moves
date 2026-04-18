const express = require('express');
const cors = require('cors');
const { spawn } = require('child_process');
const app = express();
const port = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

app.post('/knight-path', (req, res) => {
  const { start, end } = req.body;

  if (!start || !end) {
    return res.status(400).json({ error: 'Start and end positions are required' });
  }

  // Spawn the compiled C++ executable
  const cpp = spawn('./moves_exe');

  let output = '';
  let errorOutput = '';

  // Write input to C++ process
  cpp.stdin.write(`${start} ${end}\n`);
  cpp.stdin.end();

  cpp.stdout.on('data', (data) => {
    output += data.toString();
  });

  cpp.stderr.on('data', (data) => {
    errorOutput += data.toString();
  });

  cpp.on('close', (code) => {
    if (code !== 0) {
      console.error(`C++ process exited with code ${code}: ${errorOutput}`);
      return res.status(500).json({ error: 'Internal server error in pathfinding' });
    }
    try {
      const result = JSON.parse(output);
      res.json(result);
    } catch (e) {
      console.error('Failed to parse C++ output:', output);
      res.status(500).json({ error: 'Invalid output from pathfinding engine' });
    }
  });
});

app.listen(port, () => {
  console.log(`Bridge server listening at http://localhost:${port}`);
});
