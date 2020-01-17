const express = require('express');

const router = express.Router();

const Database = require('./userDb.js');

const postDatabase = require('../posts/postDb.js');

router.post('/', validateUser, (req, res) => {
  // do your magic!
  Database.insert(req.body)
  .then(info => {
    res.status(201).json(info)
  })
  .catch(error => {
    console.log(error);
    res.status(500).json({ error: "There was an error while saving the comment to the database" })
  })
});

router.post('/:id/posts', validatePost, (req, res) => {
  // do your magic!

  const { text } = req.body;
  const user_id = req.params.id;
  // const random = { text: text, user_id: user_id }

  postDatabase.insert({ text, user_id })
  .then(post => {
    res.status(201).json(post)
  })
  .catch(error => {
    console.log(error);
    res.status(500).json({ error: "There was an error while saving the comment to the database" })
  })
});

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

router.get('/:id', validateUserId, (req, res) => {
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

router.get('/:id/posts', (req, res) => {
  // do your magic!
  const id = req.params.id;

    Database.getUserPosts(id)
    .then(post => {
        if (post[0]) {
        res.status(200).json(post);
        } else {
            res.status(404).json({ message: "The post with the specified ID does not exist." })
        }
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({ message: 'Error retrieving post' });
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

//custom middleware

function validateUserId(req, res, next) {
  // do your magic!
  Database.getById(req.params.id)
    .then(user => {
        if (!user) {
        res.status(404).json({ message: "The user with the specified ID does not exist." });
        } else {
          next();
        }
  })
}

function validateUser(req, res, next) {
  // do your magic!
  if(Object.entries(req.body).length === 0) {
    res.status(400).json({ message: "missing user data" })
  } else if (!req.body.name) {
    res.status(400).json({ message: "missing required name field" })
  } else {
    next();
  }
}

function validatePost(req, res, next) {
  // do your magic!
    if(Object.entries(req.body).length === 0) {
      res.status(400).json({ message: "missing post data" })
    } else if (!req.body.text) {
      res.status(400).json({ message: "missing required text field" })
    } else {
    next();
  }
}
module.exports = router;
