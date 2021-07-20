const router = require("express").Router();
const jwt = require("jsonwebtoken");

const User = require("../models/user");
const { SECRETKEY } = require("../config");

router.route("/isValid").post((req, res) => {
	User.findOne({ email: req.body.email })
		.then((result) => {
			if (result) {
				console.log("User already subscribed", result);
				return res.status(200).send({
					status: "rejected",
					info: "User already subscribed",
					response: result,
				});
			}
			const user = new User({
				id: req.body.id,
				name: req.body.name,
				password: req.body.password,
				email: req.body.email,
			})
				.save()
				.then((result) => {
					console.log("User subscribed", result);
					res.status(200).send({
						status: "accepted",
						info: "User subscribed",
						response: result,
					});
				})
				.catch((err) => {
					console.log("User subscription error", err);
					res.status(402).send(err);
				});
		})
		.catch((err) => {
			console.log("DB findOne error", err);
			res.status(402).send({
				status: "error",
				info: "DB findOne user error",
				response: err,
			});
		});
});
router.route("/login").post((req, res) => {
	User.findOne({ email: req.body.email, password: req.body.password }).then(
		(result) => {
			if (!result) {
				console.log("Email or password is invalid");
				return res.status(200).send({
					status: "rejected",
					info: "Email or password is invalid",
					response: result,
				});
			}
			jwt.sign({ email: req.body.email }, SECRETKEY, (err, token) => {
				if (err) {
					console.log("JWT sign error", err);
					return res
						.status(200)
						.send({ status: "error", info: "Token sign error", response: err });
				}
				console.log("login success");
				res.status(200).send({
					status: "accepted",
					info: "Login success",
					response: { payload: result, token: token },
				});
			});
		}
	);
});
router.route("/isLogin").post((req, res) => {
	jwt.verify(req.body.token, SECRETKEY, (err, decoded) => {
		if (err) {
			console.log("Token verify error");
			return res
				.status(200)
				.send({ status: "error", info: "Token verify error", response: {} });
		}
		console.log("Token verify accepted");
		User.findOne({ email: decoded.email })
			.then((result) => {
				console.log("Token verify accepted && User findOne success");
				res.status(200).send({
					status: "accepted",
					info: "Token verify accepted",
					response: { id: result.id, email: result.email },
				});
			})
			.catch((err) => {
				console.log("Token verify accepted && User findOne error");
				res.status(200).send({
					status: "rejected",
					info: "Token verify accepted && User findOne error",
					response: err,
				});
			});
	});
});

module.exports = router;
