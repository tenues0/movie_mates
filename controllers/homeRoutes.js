const router = require('express').Router();
const {
  Movies,
  Ratings,
  User
} = require('../models');
const withAuth = require('../utils/auth');

//baseline express route, for loading homepage.handlebars;
//gets all posted reviews of movies
router.get('/', async (req, res) => {
  console.log("hello" + req.session.logged_in + req.session.email);
  try {
    const postData = await Movies.findAll({
      attributes: ["id", "movie_review", "post_content", "date_created", "user_id"],
      include: [
        {
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
        attributes: ['username'],
      },
     ]
    });
    //serialize the data//
    const posts = postData.map((post) =>
      post.get({
        plain: true
      })
    );
      //return Handlebars template to homepage
    res.render('homepage', {
      posts,
      logged_in: req.session.logged_in,
      username: req.session.username,
    });
    console.log(req.session.logged_in, req.session.username);



  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//this is the route to add comment to a post; NEED TO WORK ON THIS//
router.get('/post/:id', async (req, res) => {
  console.log("getting post/id")
  console.log(req.params.id)
  console.log(req.body)
  try {
    const moviesData = await Movies.findOne({
      where: {
        id: req.params.id,
      },
    attributes: ["id", "post_content", "movie_review", "date_created"],    
    include: [
        {
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
})
 // if no data is found, return 404 and message
 if (!moviesData) {
  res.status(404).json({ message: "error here at get by id" });
  return;
}
// By default Sequelize returns lots of metadata
// To turn medatada off, we use the plain: true option
const post = moviesData.get({ plain: true });
// render the Handlebars view here
res.render("post", {
  post,
  logged_in: req.session.logged_in,
  username: req.session.username
});
} catch(err) {
console.log(err);
// returns a '500 Internal Server Error' response
res.status(500).json(err);
};
});

    
    

// GET '/login' (login form)
router.get('/login', (req, res) => {
  //if user logged in, redirect to dashboard
  if (req.session.logged_in) {
    res.redirect('/api/dashboard');
    return;

  }
  res.render('login')

});

// GET '/signup' (registration form)
// router.get('/signup', (req, res) => {
//   res.render('signup');
// });

// Use withAuth middleware to prevent access to route
// /dashboard
// router.get('/dashboard', withAuth, async (req, res) => {
//   try {
//     const postData = await Movies.findAll({
//       where: {
//         // use the ID from the session
//         user_id: req.session.user_id
//       },

//       include: [{
//         model: User,
//         attributes: ['username'],
//       }]
//     })
//     const posts = postData.map(post => post.get({
//       plain: true
//     }));
//     res.render('dashboard', {
//       posts,
//       logged_in: req.session.logged_in,
//       username: req.session.username
//     });

//   } catch (err) {
//     res.status(500).json(err);
//   }
// });



module.exports = router;