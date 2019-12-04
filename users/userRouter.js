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
router.post('/', (req, res) => {
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
router.put('/:id', (req, res) => {
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
router.delete('/:id', (req, res) => {
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
router.get('/:id/posts', (req, res) => {
  Users.getUserPosts(req.params.id)
  .then(posts => {
    res.status(200).json(posts);
  })
  .catch(error => {
    console.log(error);
    res.status(500).json({ error: "The posts information could not be retrieved." });
  });  
});

// CREATE POST /:id/posts
// router.post('/:id/posts', (req, res) => {
//   const newPost = req.body;

//   Users.getById(req.params.id, newPost)
//   .then(post => {
//     Posts.insert(newPost)
//     res.status(200).json(post);
//   })
//   .catch(error => {
//     console.log(error);
//     res.status(500).json({ error: "The posts information could not be retrieved." });
//   });  
// });

// POST posts/:id/posts
router.post('/:id/posts', (req, res) => {
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
  // do your magic!
}

function validateUser(req, res, next) {
  // do your magic!
}

function validatePost(req, res, next) {
  // do your magic!
}

module.exports = router;
