var mongoose = require('mongoose');

// арилжааны шимтгэл хувь болон тоогоор хадгалагдах
const ConfigSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  value: {
    type: String,
    required: false
  }
}, {
  timestamps: true,
});

module.exports = mongoose.model('Config', ConfigSchema);
