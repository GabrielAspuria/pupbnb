const express = require('express')
const { check } = require('express-validator')
const { asyncHandler } = require('../../utils/util')
const db = require('../../db/models')
const { Spot, User, Review } = db
const { restoreUser, requireAuth} = require("../../utils/auth")
const { handleValidationErrors } = require('../../utils/validation')
// const { json } = require('sequelize/types')


const router = express.Router();

const spotValidator = [
  check('name')
    .exists({checkFalsy: true})
    .withMessage('Name your spot!')
    .isLength({max: 255})
    .withMessage('Name too long'),
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
  const editSpot = await spot.update(req.body)
  return res.json(editSpot)
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
