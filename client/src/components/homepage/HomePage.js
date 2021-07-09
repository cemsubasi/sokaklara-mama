import { useEffect } from "react";
import { connect } from "react-redux";

import useLocationStates from "./useLocationStates";
import { setInitLocation, setLocationState } from "./homeActions";
import Header from "../../common/Header";
import Modal from "../../common/Modal";
import Map from "./map/Map";
import MapForm from "./map/MapForm";
import styles from "./home.module.css";

function HomePage(props) {
	const [initLocation, locationState] = useLocationStates();
	useEffect(
		() => {
			props.setInitLocation(initLocation);
			props.setLocationState(locationState);
		},
		//eslint-disable-next-line
		[initLocation, locationState]
	);

	console.log(
		"%cState",
		"background-color: yellow; padding: 1rem; color: black; font-size: 1.4rem",
		props.state
	);

	return (
		<>
			<Modal />
			<div
				style={props.modalVisibility ? { filter: "blur(2px)" } : {}}
				className={styles.container}
			>
				<div className={styles.header}>
					<Header />
				</div>
				<div className={styles.bottomHeader}></div>
				<div className={styles.mapSection}>
					<div className={styles.mapGroup}>
						<div className={styles.mapContainer}>
							<Map apiKey={process.env.REACT_APP_APIKEY} />
						</div>
						{props.isLogin && <MapForm />}
					</div>
				</div>
			</div>
		</>
	);
}

const mapStateToProps = (state) => {
	return {
		state: state,
		isLogin: state.isLogin,
	};
};

export default connect(mapStateToProps, {
	setInitLocation,
	setLocationState,
})(HomePage);
