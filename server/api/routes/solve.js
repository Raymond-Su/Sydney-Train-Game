const express = require('express');
const solve = require('../../utils/findSolutions');
const router = express.Router();

router.post('/puzzle', (req, res) => {
  if (!('puzzle' in req.body)) {
    res.status(400).json({ message: 'Missing puzzle' });
  }
  const puzzleInput = req.body.puzzle;
  const hasSolutions = solve.isSolveable(puzzleInput);
  const solutions = solve.findSolutions(puzzleInput);

  res.status(200).json({
    hasSolutions: hasSolutions,
    solutions: solutions
  });
});

module.exports = router;
