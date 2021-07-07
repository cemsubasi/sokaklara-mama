const router = require("express").Router();
const jwt = require("jsonwebtoken");
const Location = require("../models/foodLocation");
const { SECRETKEY } = require("../config");

router
	.route("/")
	.get((req, res) => {
		Location.find()
			.then((result) => {
				console.log("location find success");
				res.status(200).send({
					status: "accepted",
					info: "location find success",
					response: result,
				});
			})
			.catch((err) => {
				console.log("location find error");
				res.status(200).send({
					status: "error",
					info: "location find error",
					response: [],
					error: err,
				});
			});
	})
	.post((req, res) => {
		jwt.verify(req.body.token, SECRETKEY, (err, decoded) => {
			if (err) {
				console.log("token verify error");
				return res.status(200).send({
					status: "error",
					info: "token verify error",
					response: {},
					error: err,
				});
			}
			console.log("token verify accepted");
			Location.findOne({
				lat: { $lt: req.body.lat + 0.00035, $gt: req.body.lat - 0.00035 },
			})
				.then((result) => {
					if (result) {
						console.log("there is already circle", result);
						return res.status(200).send({
							status: "rejected",
							info: "there is already a circle",
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
							console.log("token verify accepted && location add success");
							console.log("result", result);
							res.status(200).send({
								status: "accepted",
								info: "token verify accepted && location add success",
								response: result,
							});
						})
						.catch((err) => {
							console.log("token verify accepted && location add error");
							res.status(200).send({
								status: "rejected",
								info: "token verify accepted && location add error",
								response: {},
								error: err,
							});
						});
				})
				.catch((err) => {
					console.log("location findone error", err);
					res.status(200).send({
						status: "error",
						info: "location findone error",
						response: {},
						error: err,
					});
				});
		});
	})
	.delete((req, res) => {
		Location.findOneAndRemove({ id: req.body.id })
			.then((result) => {
				console.log("remove circle success");
				res.status(200).send({
					status: "accepted",
					info: "remove circle success",
					response: { id: req.body.id },
				});
			})
			.catch((err) => {
				console.log("location find error");
				res.status(200).send({
					status: "error",
					info: "location find error",
					response: { id: req.body.id },
					error: err,
				});
			});
	});

module.exports = router;
