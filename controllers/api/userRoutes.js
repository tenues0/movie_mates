const router = require('express').Router();
const {
  User
} = require('../../models');

//express route to create user
router.post('/', async (req, res) => {
  try {

    const userData = await User.create(req.body);
    console.log(userData.id);
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.status(200).json(userData);
    });
    console.log(req.session.user_id)
  } catch (err) {
    console.log("errored");
    res.status(400).json(err);
  }
});

//express route for user login; see login.handlebars template
router.post('/login', async (req, res) => {
  try {
    //look up user in database
    const userData = await User.findOne({
      where: {
        email: req.body.email
      }
    });
    console.log(userData);

    if (!userData) {
      res
        .status(400)
        .json({
          message: 'Incorrect username or password, please try again'
        });
      return;
    }
    //check password in database to see if password matches.
    //if no match -> 400 bad request, error
    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({
          message: 'Incorrect email or password, please try again'
        });
      return;
    }
    //upon user login, sessions variable logged_in = true; 
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      res.json({
        user: userData,
        message: 'You are now logged in!'

      })
    });



  } catch (err) {
    res.status(400).json(err);
  }

});
//user logout
//when user logs out, session is destroyed.
router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;