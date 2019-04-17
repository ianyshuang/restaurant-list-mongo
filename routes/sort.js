const express = require('express')
const router = express.Router()
const Restaurant = require('../models/restaurant')
const category = require('./category')

function getOrder(order) {
  return (order === 'true') ? 'asc' : 'desc'
}

router.get('/name', (req, res) => {
  const order = getOrder(req.query.asc)
  Restaurant.find().sort({ name: order }).exec((err, restaurants) => {
    if (err) return console.error(err)

    category.then(result => {
      return res.render('index', { restaurants: restaurants, categories: result })
    })
  })
})

router.get('/name_en', (req, res) => {
  const order = getOrder(req.query.asc)
  Restaurant.find().sort({ name_en: order }).exec((err, restaurants) => {
    if (err) return console.error(err)

    category.then(result => {
      return res.render('index', { restaurants: restaurants, categories: result })
    })
  })
})

router.get('/rating', (req, res) => {
  const order = getOrder(req.query.asc)
  Restaurant.find().sort({ rating: order }).exec((err, restaurants) => {
    if (err) return console.error(err)

    category.then(result => {
      return res.render('index', { restaurants: restaurants, categories: result })
    })
  })
})

module.exports = router