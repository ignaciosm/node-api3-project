const express = require('express');

const Users = require('../users/userDb');
const Posts = require('../posts/postDb');
const router = express.Router();
router.use(express.json());

// READ users
router.get('/', (req, res) => {
  Users.get(req)
  .then(users => {
    res.status(200).json(users);
  })
  .catch(error => {
    console.log(error);
    res.status(500).json({ error: "The posts information could not be retrieved." });
  });
});

// CREATE users
router.post('/', validateUser, (req, res) => {
  Users.insert(req.body)
  .then(user => {
    res.status(200).json(user);
  })
  .catch(error => {
    console.log(error);
    res.status(500).json({ error: "The posts information could not be retrieved." });
  });
});

// UPDATE users
router.put('/:id', validateUserId, (req, res) => {
  Users.update(req.params.id, req.body)
  .then(users => {
    res.status(200).json(users);
  })
  .catch(error => {
    console.log(error);
    res.status(500).json({ error: "The posts information could not be retrieved." });
  });

});

// DELETE users
router.delete('/:id', validateUserId, (req, res) => {
  Users.remove(req.params.id)
  .then(users => {
    res.status(200).json(users);
  })
  .catch(error => {
    console.log(error);
    res.status(500).json({ error: "The posts information could not be retrieved." });
  });
});

// GET /:id/posts
router.get('/:id/posts', validateUserId, (req, res) => {
  Users.getUserPosts(req.params.id)
  .then(posts => {
    res.status(200).json(posts);
  })
  .catch(error => {
    console.log(error);
    res.status(500).json({ error: "The posts information could not be retrieved." });
  });  
});

// CREATE posts/:id/posts
router.post('/:id/posts', validateUserId, validatePost, (req, res) => {
  const id = req.params.id;
  const newPost = req.body;

  Users.getById(id)
    .then(post => {
      Posts.insert(newPost)
        .then(post => {
          res.status(201).json(post);
        })
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ error: "There was an error while saving the comment to the database." });
    });
});


//custom middleware

function validateUserId(req, res, next) {
  const id = req.params.id;
  Users.getById(id)
  .then(user => {
    if (user) {
      req.user = user;
      next();
    } else {
      res.status(400).json({ message: "invalid user id" });
    }
  });
}

function validateUser(req, res, next) {
  console.log('validateUser')
  const validUser = req.body;

  if (!validUser) {
    res.status(400).json({ message: "missing user data" });
  } else if (!validUser.name) {
    res.status(400).json({ message: "missing required name field" });
  } else {
    next();
  }
}

function validatePost(req, res, next) {
  const validPost = req.body;

  if (!validPost) {
    res.status(400).json({ message: "missing post data" });
  } else if (!validPost.text) {
    res.status(400).json({ message: "missing required text field" });
  } else {
    next();
  }
}

module.exports = router;
