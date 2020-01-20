require('dotenv').config();
var path = require('path');
const express = require('express');
const cors = require('cors');
const Vote = require('./models/Vote');
const connectDB = require('./connectDB');
connectDB();

const app = express();
app.use(express.json());
app.use(cors());

app.get('/tableOne', async (req, res) => {
	try {
		const mila = await Vote.find({});

		// delete mila._id;
		res.sendFile(path.resolve(__dirname, 'client', 'tableOne.html'));
		console.log(mila);
	} catch (error) {
		console.error(error);
	}
});
app.get('/tableOneData', async (req, res) => {
	try {
		const mila = await Vote.find();
		let milaa = [];
		mila.forEach((e) => {
			let tempObj = {};
			tempObj.email = e.email;
			tempObj.phone = e.phone;
			tempObj.likes = e.likes;
			tempObj.disLikes = e.disLikes;
			milaa.push(tempObj);
		});

		res.send(milaa);
	} catch (error) {
		console.error(error);
	}
});
app.get('/tableTwoData', async (req, res) => {
	try {
		let likesList = [ 0, 0, 0, 0, 0 ];
		let disLikesList = [ 0, 0, 0, 0, 0 ];

		const mila = await Vote.find();
		mila.forEach(async (object) => {
			let likes = object.likes.toString();
			let disLikes = object.disLikes.toString();

			if (likes.includes('image1')) {
				likesList[0]++;
			}
			if (likes.includes('image2')) {
				likesList[1]++;
			}
			if (likes.includes('image3')) {
				likesList[2]++;
			}
			if (likes.includes('image4')) {
				likesList[3]++;
			}
			if (likes.includes('image5')) {
				likesList[4]++;
			}
			if (disLikes.includes('image1')) {
				disLikesList[0]++;
			}
			if (disLikes.includes('image2')) {
				disLikesList[1]++;
			}
			if (disLikes.includes('image3')) {
				disLikesList[2]++;
			}
			if (disLikes.includes('image4')) {
				disLikesList[3]++;
			}
			if (disLikes.includes('image5')) {
				disLikesList[4]++;
			}
		});

		console.log('total liked', likesList);
		console.log('total liked', disLikesList);

		let sendObj = [
			{
				image: 'image1',
				likes: likesList[0],
				dislikes: disLikesList[0]
			},
			{
				image: 'image2',
				likes: likesList[1],
				dislikes: disLikesList[1]
			},
			{
				image: 'image3',
				likes: likesList[2],
				dislikes: disLikesList[2]
			},
			{
				image: 'image4',
				likes: likesList[3],
				dislikes: disLikesList[3]
			},
			{
				image: 'image5',
				likes: likesList[4],
				dislikes: disLikesList[4]
			}
		];

		res.send(sendObj);
		// console.log(mila);
	} catch (error) {
		console.error(error);
	}
});

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
