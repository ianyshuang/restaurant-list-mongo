const express = require('express')
const router = express.Router()
const Restaurant = require('../models/restaurant')
const category = require('./category') // 載入 category.exec()回傳的Promise


router.get('/:condition', (req, res) => {
  const condition = req.params.condition
  const order = req.query.order

  // ES6語法，在變數外加中括號可
  Restaurant.find().sort({ [condition]: order }).exec((err, restaurants) => {
    if (err) return console.error(err)

    category.then(result => {
      return res.render('index', { restaurants: restaurants, categories: result })
    })
  })
})

module.exports = router