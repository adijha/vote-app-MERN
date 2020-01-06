const mongoose = require('mongoose');

const connectDB = async () => {
	try {
		await mongoose.connect(process.env.mongoURI, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useCreateIndex: true
		});

		console.log('Mongo COnnected');
	} catch (error) {
		console.error('MongoDB not connected');
	}
};

module.exports = connectDB;
