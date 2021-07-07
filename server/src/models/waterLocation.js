const mongoose = require("mongoose");

module.exports = mongoose.model(
	"waterLocation",
	new mongoose.Schema({
		id: {
			type: Number,
			require: true,
			unique: true,
		},
		email: {
			type: String,
			require: true,
		},
		lat: {
			type: Number,
			require: true,
		},
		lng: {
			type: Number,
			require: true,
		},
		info: {
			type: String,
		},
		expireAt: {
			type: Date,
			default: Date.now(),
			index: {
				expires: "1h",
			},
		},
	})
);
