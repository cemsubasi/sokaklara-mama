import { initialState } from "./config";

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case "SET_LOGIN":
			return { ...state, isLogin: action.payload };
		case "SET_USER":
			return { ...state, user: action.payload };
		case "SET_INIT_LOCATION":
			return { ...state, initLocation: action.payload };
		case "SET_LOCATION_STATE":
			return { ...state, locationState: action.payload };
		case "SET_FOOD_LIST_OF_CITIES":
			return { ...state, foodListOfCities: action.payload };
		case "SET_WATER_LIST_OF_CITIES":
			return { ...state, waterListOfCities: action.payload };
		case "SET_MODAL":
			return {
				...state,
				modal: {
					...state.modal,
					payload: action.payload,
				},
			};
		case "SET_MODAL_VISIBILITY":
			return {
				...state,
				modal: {
					...state.modal,
					visibility: action.payload,
				},
			};
		case "SET_DIMMER":
			return {
				...state,
				dimmer: {
					...state.dimmer,
					visibility: action.payload.visibility,
					payload: action.payload.payload,
					timeout: action.payload.timeout ?? 800,
				},
			};

		default:
			return state;
	}
};

export default reducer;
