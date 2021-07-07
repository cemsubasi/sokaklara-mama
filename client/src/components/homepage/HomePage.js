import { useState } from "react";
import { connect } from "react-redux";

import useLocationStates from "./useLocationStates";
import Header from "../../common/Header";
import Map from "./map/Map";
import MapForm from "./map/MapForm";
import styles from "./home.module.css";

function HomePage(props) {
	const [initLocation, locationState] = useLocationStates();
	const [foodListOfCities, setFoodListOfCities] = useState([]);
	const [waterListOfCities, setWaterListOfCities] = useState([]);

	return (
		<div className={styles.container}>
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
	);
}

const mapStateToProps = (state) => {
	return {
		isLogin: state.isLogin,
	};
};

export default connect(mapStateToProps)(HomePage);
