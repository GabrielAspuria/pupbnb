const express = require('express')
const { csrfProtection, asyncHandler } = require('../utils/util')
const db = require('../db/models')
const { Spot, User, Review } = db
const { restoreUser, requireAuth, setTokenCookie} = require("../utils/auth")
const { check, validationResult } = require('express-validator')
const e = require('express')

const router = express.Router();

router.get('/', requireAuth, restoreUser, asyncHandler(async (req, res) => {
    try {
        const spots = await Spot.findAll();
        res.render(spots.photos)
    } catch (error) {
        res.send(error)
    }
}))


