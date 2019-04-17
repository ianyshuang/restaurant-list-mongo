const express = require('express')
const router = express.Router()
const Restaurant = require('../models/restaurant')
const category = require('./category')

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

    category.then(result => {
      return res.render('index', { restaurants: restaurants, categories: result })
    }).catch(err => {
      console.error(err)
    })
  })
})

module.exports = router