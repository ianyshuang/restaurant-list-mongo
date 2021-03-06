const express = require('express')
const router = express.Router()
const Restaurant = require('../models/restaurant')
const category = require('./category')

// 取得所有餐廳資料
router.get('/', (req, res) => {
  Restaurant.find((err, restaurants) => {
    if (err) return console.error(err)

    category.then(result => {
      res.render('index', { restaurants: restaurants, categories: result })
    }).catch(err => {
      console.error(errr)
    })
  })
})

module.exports = router