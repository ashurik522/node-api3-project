const express = require('express');
const Users = require('./users-model')
const Posts = require('../posts/posts-model')
const { logger, validateUserId, validateUser, validatePost } = require('../middleware/middleware')

// You will need `users-model.js` and `posts-model.js` both
// The middleware functions also need to be required

const router = express.Router();

router.use(logger)

router.get('/', (req, res) => {
  Users.get()
    .then(users => {
      res.status(200).json(users)
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({ message: 'Error retrieving users'})
    })
});

router.get('/:id', validateUserId, (req, res) => {
  res.status(200).json(req.user)
});

router.post('/', validateUser, (req, res, next) => {
  Users.insert(req.newUser)
    .then(user => {
      res.status(201).json(user)
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({ message: 'Error posting user'})
    })
});

router.put('/:id',validateUserId, validateUser, (req, res) => {
  Users.update(req.params.id, req.newUser)
    .then(user =>{
      res.status(200).json(user)
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: 'Error updating user'})
    })
});

router.delete('/:id',validateUserId, (req, res) => {
  Users.remove(req.params.id)
    .then(() => {
      res.status(200).json(req.user)
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({ message: "Error removing user"})
    })
});

router.get('/:id/posts', validateUserId, (req, res, next) => {
  Users.getUserPosts(req.params.id)
    .then(posts => {
      res.status(200).json(posts)
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({ message: "Error retrieving posts"})
    })
});

router.post('/:id/posts', validateUserId, validatePost, (req, res) => {
  const postInfo = { ...req.body, user_id: req.params.id }
  
  Posts.insert(postInfo)
    .then(post => {
      res.status(201).json(post)
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({ message: 'Error creating post'})
    })

});

// do not forget to export the router

module.exports = router;
