// 初始建置
const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const path = require('path')

// 載入model
const Restaurant = require('./models/restaurant')

// 連線到mongodb的restaurant資料庫
mongoose.connect('mongodb://127.0.0.1/restaurant', { useNewUrlParser: true })

// 將回傳的資料庫物件以db這個reference儲存
const db = mongoose.connection

// 連線錯誤
db.on('error', () => {
  console.log('failed to connect to mongodb')
})

// 成功連線
db.once('open', () => {
  console.log('connected to mongodb!')
})

// 設置靜態檔案路徑
app.use(express.static(path.join(__dirname, 'public')))

// 設置views跟template engine
app.set('view engine', 'pug')
app.set('views', path.join(__dirname, 'views'))

//設置body-parser
app.use(bodyParser.urlencoded({ extended: true }))

// 取得所有餐廳資料
app.get('/', (req, res) => {
  Restaurant.find((err, restaurants) => {
    if (err) return console.error(err)
    res.render('index', { restaurants: restaurants })
  })
})

// 新增餐廳的頁面
app.get('/restaurants/new', (req, res) => {
  res.render('new')
})

// 新增餐廳的動作
app.post('/restaurants', (req, res) => {
  // 新增表單傳過來的餐廳物件
  const restaurant = new Restaurant(req.body)

  // 將rating從字串轉成數字
  restaurant.rating = Number(restaurant.rating)

  // 存進db
  restaurant.save(err => {
    if (err) return console.error(err)
    return res.redirect('/')
  })
})

// 取得餐廳詳細資料
app.get('/restaurants/:id', (req, res) => {
  Restaurant.findById(req.params.id, (err, restaurant) => {
    if (err) return console.error(err)
    return res.render('show', { restaurant: restaurant })
  })
})

// 修改餐廳的頁面
app.get('/restaurants/:id/edit', (req, res) => {
  Restaurant.findById(req.params.id, (err, restaurant) => {
    if (err) return console.error(err)
    return res.render('edit', { restaurant: restaurant })
  })
})

// 修改餐廳的動作
app.post('/restaurants/:id', (req, res) => {
  const updated = req.body

  Restaurant.findById(req.params.id, (err, restaurant) => {
    if (err) return console.error(err)
    // 更新restaurant的資料，不要用restaurant來迭代，因為updated中沒有_id
    for (let attribute in updated) {
      restaurant[attribute] = updated[attribute]
    }

    // 更新完後儲存回db
    restaurant.save(err => {
      if (err) return console.error(err)
      return res.redirect(`/restaurants/${restaurant.id}`)
    })
  })
})

// 刪除餐廳的動作
app.post('/restaurants/:id/delete', (req, res) => {
  Restaurant.findById(req.params.id, (err, restaurant) => {
    if (err) return console.error(err)
    restaurant.remove(err => {
      if (err) console.error(err)
      return res.redirect('/')
    })
  })
})

// 搜尋餐廳
app.get('/search', (req, res) => {
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


app.listen(port, () => {
  console.log(`Express server is listening on http://localhost:${port}`)
})