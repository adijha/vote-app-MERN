const mongoose = require('mongoose');

const voteSchema = new mongoose.Schema({
	image: String,
	likes: Array,
	disLikes: Array,
	comments: Object
});

module.exports = mongoose.model('Vote', voteSchema);
