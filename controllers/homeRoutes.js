const router = require('express').Router();
const {
  Movies,
  Ratings,
  User
} = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  // Get all projects and JOIN with user data
  // const movieRatingsData = await Ratings.findAll({
  //   include: [{
  //       model: User,
  //       attributes: ['name'],
  //     },
  //     {
  //       model: Movies,
  //       attributes: ['movie_name']
  //     }
  //   ],
  // });

  // Serialize data so the template can read it
  // const movieRates = movieRatingsData.map((movie) => movie.get({
  //   plain: true
  // }));

  // Pass serialized data and session flag into template
  if (req.session.logged_in) {
    res.redirect('/profile');
    return
  }
  res.render('login');

});


router.get('/movies/:id', async (req, res) => {
  try {
    const moviesData = await Movies.findByPk(req.params.id, {
      include: [{
        model: Ratings,
        attributes: ['rating'],
      }],
    });

    const project = projectData.get({
      plain: true
    });

    res.render('project', {
      ...project,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Use withAuth middleware to prevent access to route
router.get('/profile', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: {
        exclude: ['password']
      },
      // include: [{
      //   model: Project
      // }],
    });

    const user = userData.get({
      plain: true
    });

    res.render('profile', {
      ...user,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});



module.exports = router;