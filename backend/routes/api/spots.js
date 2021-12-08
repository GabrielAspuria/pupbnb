const express = require('express')
const { asyncHandler } = require('../../utils/util')
const db = require('../../db/models')
const { Spot, User, Review } = db
const { restoreUser} = require("../../utils/auth")

const router = express.Router();

router.get('/', asyncHandler(async (req, res) => {
        const all = await Spot.findAll();
        return res.json(all)
}))

router.get('/:id(\\d+)', restoreUser, asyncHandler(async (req, res, next) => {
        const { spot } = req;
        const spotId = req.params.id

        if (spot) {
                const place = await Spot.findByPk(spotId)
                return res.json(place)
        }

}))


module.exports = router
