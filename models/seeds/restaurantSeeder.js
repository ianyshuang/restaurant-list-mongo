const mongoose = require('mongoose')
const Restaurant = require('../restaurant')
const restaurantList = require('../../restaurant.json')

// 連線到monogdb
mongoose.connect('mongodb://127.0.0.1/restaurant', { useNewUrlParser: true })

// 回傳連線後的資料庫物件，用db儲存
const db = mongoose.connection

// 回傳error
db.on('error', () => {
  console.log('db error')
})

// 成功連線
db.once('open', () => {
  console.log('db connected!')

  //  為一個 array
  const restaurants = restaurantList.results

  Restaurant.insertMany(restaurants, (err, results) => {
    if (err) return console.error(err)
    console.log('finished writing data')
  })
})