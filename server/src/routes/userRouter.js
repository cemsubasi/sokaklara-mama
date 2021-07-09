const router = require("express").Router();
const jwt = require("jsonwebtoken");

const User = require("../models/user");
const { SECRETKEY } = require("../config");

router.route("/isValid").post((req, res) => {
	User.findOne({ email: req.body.email })
		.then((result) => {
			if (result) {
				console.log("user already subscribed", result);
				return res.status(200).send({
					status: "rejected",
					info: "user already subscribed",
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
					console.log("user subscribed", result);
					res.status(200).send({
						status: "accepted",
						info: "user subscribed",
						response: result,
					});
				})
				.catch((err) => {
					console.log("user subscription error", err);
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
				console.log("email or password is invalid");
				return res.status(200).send({
					status: "rejected",
					info: "email or password is invalid",
					response: result,
				});
			}
			jwt.sign({ email: req.body.email }, SECRETKEY, (err, token) => {
				if (err) {
					console.log("jwt sign error", err);
					return res
						.status(200)
						.send({ status: "error", info: "token sign error", response: err });
				}
				console.log("login success");
				res.status(200).send({
					status: "accepted",
					info: "login success",
					response: { payload: result, token: token },
				});
			});
		}
	);
});
router.route("/isLogin").post((req, res) => {
	jwt.verify(req.body.token, SECRETKEY, (err, decoded) => {
		if (err) {
			console.log("token verify error");
			return res
				.status(200)
				.send({ status: "error", info: "token verify error", response: {} });
		}
		console.log("token verify accepted");
		User.findOne({ email: decoded.email })
			.then((result) => {
				console.log("token verify accepted && User findOne success");
				res.status(200).send({
					status: "accepted",
					info: "token verify accepted",
					response: { id: result.id, email: result.email },
				});
			})
			.catch((err) => {
				console.log("token verify accepted && User findOne error");
				res.status(200).send({
					status: "rejected",
					info: "token verify accepted && User findOne error",
					response: err,
				});
			});
	});
});

module.exports = router;
