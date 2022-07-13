const router = require('express').Router();
const {
    Movies
} = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/movies/:id', withAuth, async (req, res) => {
    try {
        const movie = await Movies.findByPk(req.params.id)
    } catch (err) {
        res.status(500).json(err);
    }
});

router.post('/', withAuth, async (req, res) => {
    try {
        const ratedMovies = await Movies.create({
            ...req.body
        });

        res.status(200).json(ratedMovies);
    } catch (err) {
        res.status(400).json(err);
        console.log("error")
    }
});

module.exports = router;