require('dotenv').config();
const fs = require('fs');
const Json2csvParser = require('json2csv').Parser;

const fastcsv = require('fast-csv');
var path = require('path');
const express = require('express');
const cors = require('cors');
const Vote = require('./models/Vote');
const connectDB = require('./connectDB');
connectDB();
let allah;
const app = express();
app.use(express.json());
app.use(cors());

const name = async () => {
	allah = await Vote.find();

	console.log(allah);

	writ(allah);
};
name();

const ws = fs.createWriteStream('bezkoder_mongodb_fastcsv.csv');

const writ = async (data) => {
	try {
		const json2csvParser = new Json2csvParser({ header: false });
		const csvData = json2csvParser.parse(data);

		fs.writeFile('bezkoder_mongodb_fs.csv', csvData, function(error) {
			if (error) throw error;
			console.log('Write to bezkoder_mongodb_fs.csv successfully!');
		});
		console.log('done');
	} catch (error) {
		console.error(error);
	}
};
