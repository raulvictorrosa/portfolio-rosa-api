const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const portfolioSchema = new Schema({
  title: { type: String, required: true, maxlenght: 128 },
  company: { type: String, required: true, maxlenght: 64 },
  companyWebSite: { type: String, required: true, maxlenght: 128 },
  location: { type: String, required: true },
  jobTitle: { type: String, required: true },
  description: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: false },
  createdAt: { type: Date, default: Date.now() },
});

module.exports = mongoose.model('Portfolio', portfolioSchema);
