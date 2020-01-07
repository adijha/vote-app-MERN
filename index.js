require('dotenv').config();
const express = require('express');
const cors = require('cors');
const Vote = require('./models/Vote');
const connectDB = require('./connectDB');
connectDB();

const app = express();
app.use(express.json());
app.use(cors());

app.post('/', async (req, res) => {
	try {
		const mila = await Vote.findOne({ email: req.body.email });

		if (!mila) {
			const vote = new Vote({
				email: req.body.email,
				phone: req.body.phone,
				likes: req.body.likes,
				disLikes: req.body.dislikes
			});

			console.log(req.body);

			vote.save();
			console.log('!mila');
		} else {
			let updated = await Vote.updateOne(
				{
					email: req.body.email
				},
				{
					$set: {
						likes: req.body.likes,
						disLikes: req.body.dislikes
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

app.use(express.static('client'));
app.get('*', (req, res) => {
	res.sendFile(path.resolve(__dirname, 'client', 'index.html'));
});

let port = process.env.PORT || 3000;

app.listen(port, () => {
	console.log(`App listening on port ${port}`);
});
