const router = require("express").Router();
const jwt = require("jsonwebtoken");
const Location = require("../models/waterLocation");
const { SECRETKEY } = require("../config");

router
	.route("/")
	.get((req, res) => {
		Location.find()
			.then((result) => {
				console.log("Location find success");
				res.status(200).send({
					status: "accepted",
					info: "Location find success",
					response: result,
				});
			})
			.catch((err) => {
				console.log("Location find error");
				res.status(200).send({
					status: "error",
					info: "Location find error",
					response: [],
					error: err,
				});
			});
	})
	.post((req, res) => {
		jwt.verify(req.body.token, SECRETKEY, (err, decoded) => {
			if (err) {
				console.log("Token verify error");
				return res.status(200).send({
					status: "error",
					info: "Token verify error",
					response: {},
					error: err,
				});
			}
			console.log("Token verify accepted");
			Location.findOne({
				lat: { $lt: req.body.lat + 0.0003, $gt: req.body.lat - 0.0003 },
			})
				.then((result) => {
					if (result) {
						console.log("There is already circle", result);
						return res.status(200).send({
							status: "rejected",
							info: "There is already a circle",
							response: result,
						});
					}
					const location = new Location({
						id: req.body.id,
						email: decoded.email,
						lat: req.body.lat,
						lng: req.body.lng,
						info: req.body.info,
						expireAt: Date.now() + 1000 * 60 * 60 * 24,
					})
						.save()
						.then((result) => {
							console.log("Token verify accepted && location add success");
							console.log("Result", result);
							res.status(200).send({
								status: "accepted",
								info: "Token verify accepted && location add success",
								response: result,
							});
						})
						.catch((err) => {
							console.log("Token verify accepted && location add error");
							res.status(200).send({
								status: "rejected",
								info: "Token verify accepted && location add error",
								response: {},
								error: err,
							});
						});
				})
				.catch((err) => {
					console.log("Location findone error", err);
					res.status(200).send({
						status: "error",
						info: "Location findone error",
						response: {},
						error: err,
					});
				});
		});
	})
	.delete((req, res) => {
		Location.findOneAndRemove({ id: req.body.id })
			.then((result) => {
				console.log("The circle removed successfully");
				res.status(200).send({
					status: "accepted",
					info: "The circle removed successfully",
					response: { id: req.body.id },
				});
			})
			.catch((err) => {
				console.log("Location find error");
				res.status(200).send({
					status: "error",
					info: "Location find error",
					response: { id: req.body.id },
					error: err,
				});
			});
	});

module.exports = router;
