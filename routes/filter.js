const express = require('express')
const router = express.Router()
const Restaurant = require('../models/restaurant')
const category = require('./category')

router.get('/', (req, res) => {
  Restaurant.find({ category: req.query.category }, (err, restaurants) => {
    if (err) console.error(err)

    category.then(result => {
      res.render('index', { restaurants: restaurants, categories: result })
    }).catch(err => {
      console.error(err)
    })
  })
})

module.exports = router