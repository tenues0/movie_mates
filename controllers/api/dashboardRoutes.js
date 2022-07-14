const router = require('express').Router();
const {
  User,
  Movies,
  Ratings
} = require('../../models');
const withAuth = require('../../utils/auth');

//render search form for new post creation
router.get('/search', withAuth, async (req, res) => {
  try {

    const newPost = true;

    res.render('searchForm', {
      newPost,
      logged_in: req.session.logged_in,
      username: req.session.username,
    });

  } catch (err) {
    res.status(500).json(err);
  }
});

//this should be the route to the user's dashboard
router.get("/", withAuth, async (req, res) => {
  console.log("Route for base Dashboard rendered");
  try {
    const postData = await Movies.findAll({
      where: {
        user_id: req.session.user_id,
      },
      attributes: ["id", "movie_review", "post_content", "date_created"],
      include: [{
          model: Ratings,
          attributes: [
            "id",
            "rating_content",
            "movies_id",
            "user_id",
            "date_created",
          ],
          include: {
            model: User,
            attributes: ["username"],
          },
        },
        {
          model: User,
          attributes: ["username"],
        },
      ],
    });
    // By default Sequelize returns lots of metadata
    // To turn medatada off, we use the plain: true option
    // also use 'map' with findAll
    const posts = postData.map((data) => data.get({
      plain: true
    }));
    res.render('dashboard', {
      posts,
      username: req.session.username,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    console.log(err);
    // returns a Server error response
    res.status(500).json(err);
  }
});

//renders the new post page view
router.get('/new', withAuth, async (req, res) => {
  try {

    const newPost = true;

    res.render('postForm', {
      newPost,
      logged_in: req.session.logged_in,
      username: req.session.username,
    });

  } catch (err) {
    res.status(500).json(err);
  }
});

// Route to display current post form with value to edit
//STILL NEED TO WORK ON THIS
router.get('/edit/:id', withAuth, async (req, res) => {
  console.log("triggered route to edit post in dashboard routes.")
  try {

    const postData = await Movies.findByPk(req.params.id);
    const post = postData.get({
      plain: true
    });
    const editPost = true;

    res.render('postForm', {
      ...post,
      editPost,
      username: req.session.username,
      logged_in: req.session.logged_in
    })

  } catch (err) {
    res.status(500).json(err);
  }
});

//update post (need to work on this too)
router.post('/update/:id', withAuth, async (req, res) => {
  try {

    const updatedPost = await Movies.update({
      movie_review: req.body.movie_review,
      post_content: req.body.post_content,

    }, {
      where: {
        id: req.params.id,
      }
    });

    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(400).json(err);
  }
});

// CREATE POST
router.post('/', withAuth, async (req, res) => {
  console.log("triggred route to create new post")
  console.log(req.body);
  try {

    const newPost = await Movies.create({

      movie_review: req.body.movie_review,
      post_content: req.body.post_content,
      user_id: req.session.user_id,

    });
    if (!newPost) {
      res.status(404).json({
        message: 'create post failed'
      });
      return;
    }

    res.status(200).json(newPost);
    console.log(req.body)
    console.log(req.params.id)
    //res.redirect('/api/dashboard');

  } catch (err) {
    res.status(400).json(err);
    console.log("can't create the movie post")
  }
});

// delete post
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const deletePost = await Movies.destroy({
      where: {
        id: req.params.id,
      }
    })

    if (!deletePost) {
      res.status(404).json({
        message: 'error here with delete by id!'
      });
      return;
    }

    res.status(200).json(deletePost);

  } catch (err) {
    res.status(400).json(err);
  }
});


module.exports = router;