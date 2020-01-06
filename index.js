require('dotenv').config();
const express = require('express');
const Vote = require('./models/Vote');
const connectDB = require('./connectDB');
connectDB();

const app = express();
app.use(express.json());

app.post('/', async (req, res) => {
	try {
		const mila = await Vote.findOne({ image: req.body.image });

		if (!mila) {
			const vote = new Vote({
				image: req.body.image,
				likes: req.body.like,
				disLikes: req.body.disLike,
				comments: req.body.comment
			});

			vote.save();
			console.log('!mila');
		} else {
			let updated = await Vote.updateOne(
				{
					image: req.body.image
				},
				{
					$set: {
						likes: req.body.like,
						disLikes: req.body.disLike,
						comments: req.body.comment
					}
				}
			);
			console.log('updated:', updated);
		}

		res.send('okay saved');
	} catch (error) {
		res.send(error);
	}
});

app.listen(3000, () => {
	console.log('App listening on port 3000!');
});
