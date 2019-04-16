const express = require('express')
const router = express.Router()
const Restaurant = require('../models/restaurant')

// 搜尋餐廳
router.get('/', (req, res) => {
  const keyword = req.query.keyword
  const regex = new RegExp(keyword, 'i')

  Restaurant.find({
    $or: [
      { "name": { $regex: regex } },
      { "name_en": { $regex: regex } },
      { "category": { $regex: regex } }
    ]
  }, (err, restaurants) => {
    if (err) return console.error(err)
    console.log(restaurants)
    return res.render('index', { restaurants: restaurants })
  })
})

module.exports = router