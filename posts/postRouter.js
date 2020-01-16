const express = require('express');

const router = express.Router();

const Database = require('./postDb.js');

router.get('/', (req, res) => {
  // do your magic!
  Database.get(req.query)
    .then(db => {
        res.status(200).json(db);
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({ message: 'Error retrieving the post'
        })
    })
});

router.get('/:id', (req, res) => {
  // do your magic!
  const id = req.params.id;

    Database.getById(id)
    .then(post => {
        res.status(200).json(post);
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({ message: 'Error retrieving post'});
    });
});

router.delete('/:id', (req, res) => {
  // do your magic!
  Database.remove(req.params.id)
    .then(count => {
        if (count > 0) {
            res.status(200).json({ message: "The post has been deleted." });
        } else {
            res.status(404).json({ message: "The post with the specified ID does not exist." });
        }
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({ error: "The post could not be removed" })
    });
});

router.put('/:id', (req, res) => {
  // do your magic!
  const changes = req.body;
  const id = req.params.id;

  Database.update(id, changes)
  .then(post => {
    if (post) {
      res.status(200).json(post);
    } else {
      res.status(404).json({ message: "The post with the specified ID does not exist." });
    }
  })
  .catch(error => {
    // log error to database
    console.log(error);
    res.status(500).json({ error: "The post information could not be modified." });
  });
});

// custom middleware

function validatePostId(req, res, next) {
  // do your magic!
}

module.exports = router;
