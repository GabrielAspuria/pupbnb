const express = require('express')
const { check } = require('express-validator')
const { asyncHandler } = require('../../utils/util')
const db = require('../../db/models')
const { Spot, User, Review } = db
const { restoreUser} = require("../../utils/auth")
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

router.post('/add', restoreUser, spotValidator, asyncHandler( async(req, res, next) => {
  const { user } = req;
  const {
    name,
    description,
    features,
    rating,
    photos
   } = req.body

   const userId = user.dataValues.id;

   if (user) {
    const newSpot = await Spot.create({ userId, name, description, features, rating, photos})
    return res.json(newSpot)
   }

}))

router.delete('/:id(//d+)', async (req, res, next) => {
  const { user } = req;
  console.log(user, "USER")
  const userId = user.dataValues.id;
  const spotId = req.params.id;

  if (!user) {
    const deleteSpot = await Spot.findByPk(spotId, {include: User});
    console.log(deleteSpot,"YUH")
    console.log(userId, "YEET")
    // if(+deleteSpot.userId === userId) {
      await deleteSpot.destroy();
      return res.json();
    // }
  }
})

module.exports = router
