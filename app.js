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

// root router
app.use('/', require('./routes/root'))

// restaurants router
app.use('/restaurants', require('./routes/restaurants'))

// search router
app.use('/search', require('./routes/search'))


app.listen(port, () => {
  console.log(`Express server is listening on http://localhost:${port}`)
})