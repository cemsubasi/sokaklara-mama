const express = require("express");
const foodLocationRouter = require("./routes/foodLocationRouter");
const waterLocationRouter = require("./routes/waterLocationRouter");
const userRouter = require("./routes/userRouter");

const initRoutes = (server) => {
	server.use("/user", userRouter);
	server.use("/food", foodLocationRouter);
	server.use("/water", waterLocationRouter);
};
module.exports = initRoutes;
