// models/Product.js
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'اسم المنتج إجباري.'],
    trim: true,
    unique: true
  },
  description: {
    type: String,
    required: [true, 'وصف المنتج إجباري.']
  },
  price: {
    type: Number,
    required: [true, 'سعر المنتج إجباري.'],
    min: [0, 'السعر لا يمكن أن يكون أقل من 0.']
  },
  category: {
    type: String,
    required: [true, 'التصنيف إجباري.'],
    enum: ['موبايلات', 'رواتر', 'كاميرات مراقبة', 'اكسسوارات موبايلات', 'أخرى']
  },
  imageURL: {
    type: String,
    required: [true, 'رابط الصورة إجباري.']
  }
}, {
  timestamps: true
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
