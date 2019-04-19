const express = require('express')
const router = express.Router()
const Restaurant = require('../models/restaurant')
const category = require('./category') // 載入 category.exec()回傳的Promise


router.get('/', (req, res) => {
  let sortObject = {}
  let filterObject = {}
  if (req.query.sort !== undefined) {
    const condition = JSON.parse(req.query.sort).condition
    const order = JSON.parse(req.query.sort).order
    sortObject[condition] = order
  }
  if (req.query.filter !== undefined) {
    filterObject = { category: req.query.filter }
    console.log('hi')
  }

  // ES6語法，在變數外加中括號可
  Restaurant.find(filterObject).sort(sortObject).exec((err, restaurants) => {
    if (err) return console.error(err)

    category.then(result => {
      return res.render('index', { restaurants: restaurants, categories: result })
    })
  })
})

module.exports = router