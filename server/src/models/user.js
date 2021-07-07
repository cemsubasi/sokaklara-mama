const mongoose = require("mongoose");

module.exports = mongoose.model(
	"user",
	mongoose.Schema({
		id: {
			type: Number,
			require: true,
			unique: true,
		},
		name: {
			type: String,
			require: true,
		},
		password: {
			type: String,
			require: true,
		},
		email: {
			type: String,
			require: true,
			unique: true,
		},
	})
);
