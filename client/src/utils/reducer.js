import { initialState } from "./config";

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case "SET_LOGIN":
			return { ...state, isLogin: action.payload };
		case "SET_USER":
			return { ...state, user: action.payload };
		default:
			return state;
	}
};

export default reducer;
