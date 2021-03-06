import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import HomePage from "./homepage/HomePage";
import SignupPage from "./signuppage/SignupPage";
import LoginPage from "./loginpage/LoginPage";
import LogoutPage from "./logoutpage/LogoutPage";
import Dimmer from "../common/Dimmer";

function Routes() {
	return (
		<Router>
			<Dimmer />
			<Switch>
				<Route exact path="/" component={HomePage} />
				<Route path="/signup" component={SignupPage} />
				<Route path="/login" component={LoginPage} />
				<Route path="/logout" component={LogoutPage} />
			</Switch>
		</Router>
	);
}

export default Routes;
