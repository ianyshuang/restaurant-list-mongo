const express = require('express')
const router = express.Router()
const Restaurant = require('../models/restaurant')

router.get('/name', (req, res) => {
  let order = 'asc'
  if (req.query.asc === 'false') {
    order = 'desc'
  }
  Restaurant.find().sort({ name: order }).exec((err, restaurants) => {
    if (err) return console.error(err)
    return res.render('index', { restaurants: restaurants })
  })
})

router.get('/name_en', (req, res) => {
  let order = 'asc'
  if (req.query.asc === 'false') {
    order = 'desc'
  }
  Restaurant.find().sort({ name_en: order }).exec((err, restaurants) => {
    if (err) return console.error(err)
    return res.render('index', { restaurants: restaurants })
  })
})

router.get('/rating', (req, res) => {
  let order = 'asc'
  if (req.query.asc === 'false') {
    order = 'desc'
  }
  Restaurant.find().sort({ rating: order }).exec((err, restaurants) => {
    if (err) return console.error(err)
    return res.render('index', { restaurants: restaurants })
  })
})

module.exports = router