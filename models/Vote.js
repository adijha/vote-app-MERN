const mongoose = require('mongoose');

const voteSchema = new mongoose.Schema({
	email: String,
	phone: String,
	likes: String,
	disLikes: String
});

module.exports = mongoose.model('Vote', voteSchema);
