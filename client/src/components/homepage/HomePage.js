import { useState, useEffect, Fragment } from "react";
import { connect } from "react-redux";

import useLocationStates from "./useLocationStates";
import { setInitLocationAct, setLocationStateAct } from "./homeActions";
import Header from "../../common/Header";
import Modal from "../../common/Modal";
import Map from "./map/Map";
import MapForm from "./map/MapForm";
import styles from "./home.module.css";

function HomePage(props) {
	const [initLocation, locationState] = useLocationStates();
	useEffect(() => {
		props.setInitLocationAct(initLocation);
		props.setLocationStateAct(locationState);
	}, [initLocation, locationState]);

	const [foodListOfCities, setFoodListOfCities] = useState([]);
	const [waterListOfCities, setWaterListOfCities] = useState([]);
	const [modalVisibility, setModalVisibility] = useState(false);

	return (
		<Fragment style={{ position: "relative" }}>
			<Modal
				modalVisibility={modalVisibility}
				setModalVisibility={setModalVisibility}
			/>
			<div
				style={modalVisibility ? { filter: "blur(2px)" } : {}}
				className={styles.container}
			>
				<div className={styles.header}>
					<Header />
				</div>
				<div className={styles.bottomHeader}></div>
				<div className={styles.mapSection}>
					<div className={styles.mapGroup}>
						<div className={styles.mapContainer}>
							<Map
								initLocation={initLocation}
								foodListOfCities={foodListOfCities}
								waterListOfCities={waterListOfCities}
								apiKey={process.env.REACT_APP_APIKEY}
								setFoodListOfCities={setFoodListOfCities}
								setWaterListOfCities={setWaterListOfCities}
								locationState={locationState}
								setModalVisibility={setModalVisibility}
							/>
						</div>
						{props.isLogin && (
							<MapForm
								locationState={locationState}
								foodListOfCities={foodListOfCities}
								setFoodListOfCities={setFoodListOfCities}
								waterListOfCities={waterListOfCities}
								setWaterListOfCities={setWaterListOfCities}
							/>
						)}
					</div>
				</div>
			</div>
		</Fragment>
	);
}

const mapStateToProps = (state) => {
	return {
		isLogin: state.isLogin,
	};
};

export default connect(mapStateToProps, {
	setInitLocationAct,
	setLocationStateAct,
})(HomePage);
