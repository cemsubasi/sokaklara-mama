import axios from "axios";

const instance = new axios.create({
	baseURL:
		process.env.NODE_ENV === "production"
			? process.env.REACT_APP_PROD_API_URL
			: process.env.REACT_APP_DEV_API_URL,
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
	initLocation: {},
	locationState: {},
	foodListOfCities: [],
	waterListOfCities: [],
	modalVisibility: false,
};
