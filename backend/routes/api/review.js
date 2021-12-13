const express = require('express')
const { check } = require('express-validator')
const { asyncHandler } = require('../../utils/util')
const db = require('../../db/models')
const { User, Review, Spot } = db
const { restoreUser, requireAuth} = require("../../utils/auth")
const { handleValidationErrors } = require('../../utils/validation')

const router = express.Router();

const reviewValidator = [
    check('experience')
        .exists({checkFalsy: true})
        .withMessage('Tell us about your experience'),
    handleValidationErrors
]

router.get('/:id(\\d+)', restoreUser, asyncHandler(async (req, res, next) => {
    const spotId = req.params.id

    const allReviews = await Review.findAll({where: {spotId}})
    return res.json(allReviews)
}))

router.post('/', requireAuth, reviewValidator, asyncHandler(async (req, res, next) => {
    const review = await Review.create(req.body)
    const singleReview = await Review.findByPk(review.id, {include: User, Spot})
    return res.json(singleReview)
}))

router.put('/:id(\\d+)', restoreUser, reviewValidator, asyncHandler(async (req, res, next) => {
    const review = await Review.findByPk(req.params.id)
    await review.update(req.body)
    const newReview = await Review.findByPk(req.params.id, {include: Spot, User})
    return res.json(newReview)
}))

module.exports = router
