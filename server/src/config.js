const mongoose = require("mongoose");

const DB_URL =
	"mongodb+srv://aven:parola@cluster0.zoi2e.mongodb.net/streets?retryWrites=true&w=majority";
const DB_OPT = {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useFindAndModify: false,
	useCreateIndex: true,
};
const DB_Connect = mongoose
	.connect(DB_URL, DB_OPT)
	.then(() => console.log("DB Connected"))
	.catch((err) => console.log("DB Connection Error", err));

const PORT = process.env.PORT || 4003;
const SECRETKEY = "asdf1234**-";

module.exports = { PORT, DB_Connect, SECRETKEY };
