const router = require('express').Router();
const {
    Ratings
} = require('../../models');
const withAuth = require('../../utils/auth');

//utilizes post route to create a movie rating

//add comment
router.post('/', withAuth, async (req, res) => {
    try {
        const commentData = await Ratings.create({
            //comment_content: req.body.comment_content,
            user_id: req.session.user_id,
            username: req.session.username,
            movies_id: req.body.movies_id,
        })

        if (!commentData) {
            res.status(500).json({ message: 'Rating not found' });
            return;
        }

        res.status(200).json(commentData);
        
    } catch (err) {
        res.status(400).json(err);
    }
});

// router.post('/rating', withAuth, async (req, res) => {
//     try {
//         const movieRating = await Ratings.create({
//             ...req.body,
//             user_id: req.session.user_id,
//         });
//         res.status(200).json(movieRating);
//     } catch (err) {
//         res.status(400).json(err);
//     }
// });

// //delete wrote to get rid of the movie rating the specific req.params.id
// router.delete('/rating/:id', withAuth, async (req, res) => {
//     try {
//         const deleteRating = await Ratings.destroy({
//             where: {
//                 id: req.params.id,
//                 user_id: req.session.user_id,
//             },
//         });
//         //if there is no movie rating with that id, respond with error 404 and message
//         if (!deleteRating) {
//             res.status(404).json({
//                 message: 'There is no movie rating with that id.'
//             });
//             return;
//         }
//         res.status(200).json(deleteRating);
//     } catch (err) {
//         res.status(500).json(err);
//     }
// });

module.exports = router;