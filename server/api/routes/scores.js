const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

const UserScore = require('../models/userScores');

router.get('/', (req, res, next) => {
  UserScore.find()
    .select('name score _id')
    .exec()
    .then((docs) => {
      const response = {
        count: docs.length,
        scores: docs
      };
      res.status(200).json(response);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

router.post('/', (req, res, next) => {
  const userScore = new UserScore({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    score: req.body.score
  });

  userScore
    .save()
    .then((result) => {
      console.log(result);
      res.status(201).json({
        message: 'User score updated',
        createdScore: {
          _id: result._id,
          name: result.name,
          score: result.score
        }
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

router.get('/:userId', (req, res, next) => {
  const id = req.params.userId;
  UserScore.findById(id)
    .exec()
    .then((doc) => {
      if (doc) {
        console.log('Fetching from db', doc);
        res.status(200).json(doc);
      } else {
        res.status(400).json({
          message: 'Could not find the score for the user'
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

router.delete('/all', (req, res, next) => {
  UserScore.deleteMany({})
    .exec()
    .then((result) => {
      res.status(200).json({
        message: 'Deletion Successful',
        body: result.deletedCount
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

router.delete('/:userId', (req, res, next) => {
  const id = req.params.userId;
  UserScore.findByIdAndDelete(id)
    .exec()
    .then((result) => {
      if (result) {
        res.status(200).json({
          message: 'Deletion Successful',
          body: result
        });
      } else {
        res.status(400).json({
          message: 'Could not find the user'
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

module.exports = router;
