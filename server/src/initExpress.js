const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");

const { PORT, DB_Connect } = require("./config");

const initExpress = () => {
	const server = express();

	server.use(morgan("dev"));
	server.use(cors());
	server.use(express.json());
	server.use(
		session({ secret: "clyde", resave: true, saveUninitialized: true })
	);
	server.use(bodyParser.json());
	server.use(cookieParser());
	server.listen(PORT, DB_Connect);

	return server;
};

module.exports = initExpress;
