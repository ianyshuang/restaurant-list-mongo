const express = require('express')
const router = express.Router()
const Restaurant = require('../models/restaurant')

// 取得所有餐廳資料
router.get('/', (req, res) => {
  Restaurant.find((err, restaurants) => {
    if (err) return console.error(err)
    res.render('index', { restaurants: restaurants })
  })
})

module.exports = router