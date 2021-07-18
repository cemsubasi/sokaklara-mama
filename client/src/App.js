import { useEffect } from "react";
import { connect } from "react-redux";

import Routes from "./components/Routes";
import useLocationStates from "./utils/useLocationStates";
import { axi } from "./utils/config";
import { setInitLocation, setLocationState } from "./appActions";
import { setDimmer } from "./common/dimmerActions";
import { setLogin, setUser } from "./components/loginpage/loginAction";

function App(props) {
	const [initLocation, locationState, errorCode] = useLocationStates();
	const token = localStorage.getItem("token") || "token";

	useEffect(
		() => {
			axi("post", "/user/isLogin", { token: token })
				.then((res) => {
					if (res.status === "accepted") {
						props.setLogin(true);
						props.setUser(res.response.email);
					}
				})
				.catch(console.log);
		},
		//eslint-disable-next-line
		[]
	);

	useEffect(
		() => {
			props.setInitLocation(initLocation);
		},
		//eslint-disable-next-line
		[initLocation]
	);

	useEffect(
		() => {
			props.setLocationState(locationState);
		},
		//eslint-disable-next-line
		[locationState]
	);

	useEffect(
		() => {
			if (errorCode === 1) {
				props.setDimmer({
					timeout: 4000,
					visibility: true,
					payload: {
						type: "location",
						message: {
							head: "Location permission error",
							body: "Please be sure your location service is on ",
						},
					},
				});
			}
		},
		//eslint-disable-next-line
		[errorCode]
	);
	return <Routes />;
}

export default connect(null, {
	setLogin,
	setUser,
	setInitLocation,
	setLocationState,
	setDimmer,
})(App);
