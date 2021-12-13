const express = require('express')
const { check } = require('express-validator')
const { asyncHandler } = require('../../utils/util')
const db = require('../../db/models')
const { Spot, User, Review } = db
const { restoreUser, requireAuth} = require("../../utils/auth")
const { handleValidationErrors } = require('../../utils/validation')


const router = express.Router();

const spotValidator = [
  check('name')
    .exists({checkFalsy: true})
    .withMessage('Name your spot!')
    .isLength({max: 255})
    .withMessage('Name too long'),
  check('description')
    .exists({checkFalsy: true})
    .withMessage('Add a description!'),
  check('features')
    .exists({checkFalsy: true})
    .withMessage('Add 3 features!'),
  check('price')
    .exists({checkFalsy: true})
    .withMessage('Add price!'),
  handleValidationErrors
]

router.get('/', asyncHandler(async (req, res) => {
        const all = await Spot.findAll({include: User});
        return res.json(all)
}))

router.get('/:id(\\d+)', restoreUser, asyncHandler(async (req, res, next) => {
  const { spot } = req;
  const spotId = req.params.id

  const place = await Spot.findByPk(spotId, {include: User})
  return res.json(place)
}))

router.post('/',requireAuth, spotValidator, asyncHandler( async(req, res, next) => {
  const spot = await Spot.create(req.body)
  const place = await Spot.findByPk(spot.id, {include: User})
  return res.json(place)
}))

router.put('/:id(\\d+)', restoreUser, spotValidator, asyncHandler(async (req, res, next) => {
  const spot = await Spot.findByPk(req.params.id)
  await spot.update(req.body)
  const newSpot = await Spot.findByPk(req.params.id, {include: User})
  return res.json(newSpot)
}))

router.delete('/:id(\\d+)', requireAuth, asyncHandler(async (req, res, next) => {
  const { user } = req;
  const spotId = req.params.id;

  if (user) {
    const deleteSpot = await Spot.findByPk(spotId);
    await deleteSpot.destroy();
    const all = await Spot.findAll({include: User});
    return res.json(all);
  }
}))

module.exports = router
