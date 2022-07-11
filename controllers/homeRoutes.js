const router = require('express').Router();
const {
  Movies,
  Ratings,
  User
} = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    const postData = await Movies.findAll({
    
      include: [
        {
          model: User,
          attributes: ['username'],
        },
      ]
    });

    const posts = postData.map((post) =>
      post.get({ plain: true })
    );
    res.render('homepage', {
      posts,
      logged_In: req.session.logged_in,
      username: req.session.username,
    });

  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});


router.get('/movies/:id', async (req, res) => {
  try {
    const moviesData = await Movies.findByPk(req.params.id, {
      include: [{
        model: User,
        attributes: ['username'],
      }],
    });

    const project = projectData.get({
      plain: true
    });
    const post = postData.get({ plain: true });
    const postUser = post.user.get({ plain: true });
    console.log(post);

    // Get all comment belongs to the post with match id from req params
    const commentData = await Ratings.findAll({
      where: {
        post_id: req.params.id,
      },
      include: [
        {
          model: User,
          attributes: ['username'],
        }
      ],
    });

    const comments = commentData.map((comment) => comment.get({ plain: true }));

    res.render('post', {
      ...post,
      postUser,
      comments,
      username: req.session.username,
      logged_in: req.session.logged_in
    });

  } catch (err) {
    res.status(500).json(err);
  }
});

// GET '/login' (login form)
router.get('/login', (req, res) => {
  //if user logged in, redirect to dashboard
  if (req.session.logged_in) {
    res.redirect('/dashboard');
    return;
  
  } 
  res.render('login')
  
    });

// GET '/signup' (registration form)
router.get('/signup', (req, res) => {
  res.render('signup');
    });

// Use withAuth middleware to prevent access to route
// /dashboard
router.get('/dashboard', withAuth, async (req, res) => {
  try {
      const postData = await Movies.findAll({
          where: {
              // use the ID from the session
              user_id: req.session.user_id
          },
          
          include: [
              {
                  model: User,
                  attributes: ['username'],
              }
          ]
      })

      const posts = postData.map(post => post.get({ plain: true }));
      res.render('dashboard', {
          posts,
          logged_in: req.session.logged_in,
          username: req.session.username
      });

  } catch (err) {
      res.status(500).json(err);
  }
});



module.exports = router;