const express = require('express')
const router = express.Router()
const Restaurant = require('../models/restaurant')

function getFormattedDates(comments) {
  const dates = []
  for (let i = 0; i < comments.length; i++) {
    const year = comments[i].date.getFullYear()
    const month = comments[i].date.getMonth() + 1
    const date = comments[i].date.getDate()
    dates.push(`${year}-${month}-${date}`)
  }
  return dates
}

// 新增餐廳的頁面
router.get('/new', (req, res) => {
  res.render('new')
})

// 新增餐廳的動作
router.post('/', (req, res) => {
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
router.get('/:id', (req, res) => {
  Restaurant.findById(req.params.id, (err, restaurant) => {
    if (err) return console.error(err)

    const formattedComments = []
    if (restaurant.comments.length !== 0) {
      const formattedDates = getFormattedDates(restaurant.comments)

      for (let i = 0; i < restaurant.comments.length; i++) {
        formattedComments.push({
          name: restaurant.comments[i].name,
          date: formattedDates[i],
          detail: restaurant.comments[i].detail
        })
      }

      return res.render('show', { restaurant: restaurant, comments: formattedComments })
    } else {
      return res.render('show', { restaurant: restaurant })
    }

  })
})

// 修改餐廳的頁面
router.get('/:id/edit', (req, res) => {
  Restaurant.findById(req.params.id, (err, restaurant) => {
    if (err) return console.error(err)
    return res.render('edit', { restaurant: restaurant })
  })
})

// 修改餐廳的動作
router.put('/:id', (req, res) => {
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
router.delete('/:id/delete', (req, res) => {
  Restaurant.findById(req.params.id, (err, restaurant) => {
    if (err) return console.error(err)
    restaurant.remove(err => {
      if (err) console.error(err)
      return res.redirect('/')
    })
  })
})

// 增加留言的動作
router.post('/:id/comment', (req, res) => {
  const comment = req.body
  Restaurant.findByIdAndUpdate(req.params.id,
    { $push: { comments: comment } },
    (err, restaurant) => {
      if (err) return console.error(err)
      return res.redirect(`/restaurants/${restaurant.id}`)
    })
})

module.exports = router