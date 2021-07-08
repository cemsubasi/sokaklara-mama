import axios from "axios";

const instance = new axios.create({
	baseURL: "http://127.0.0.1:4004",
	// baseURL: "https://sokaklaramama.3hree1ne.com",
});

export const axi = (method, url, arg) => {
	return new Promise((resolve, reject) => {
		instance[method](url, arg)
			.then((res) => resolve(res.data))
			.catch((err) => reject(err));
	});
};

export const initialState = {
	isLogin: false,
	user: "",
};
