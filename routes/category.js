const Restaurant = require('../models/restaurant')

// 使用distinct取得不重複的所有種類，第二個參數為條件，不設條件即為空物件
const promise = Restaurant.distinct('category').exec()

module.exports = promise