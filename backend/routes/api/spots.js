const express = require('express')
const { csrfProtection, asyncHandler } = require('../../utils/util')
const db = require('../../db/models')
const { Spot, User, Review } = db
const { restoreUser, requireAuth, setTokenCookie} = require("../../utils/auth")
const { check, validationResult } = require('express-validator')
const e = require('express')

const router = express.Router();

router.get('/', asyncHandler(async (req, res) => {
        const spots = await Spot.findAll();
        return res.json(spots)
}))

router.get('/:id', asyncHandler(async (req, res) => {
        const spot = await Spot.findByPk();
        return res.json(spot)
}))


module.exports = router
