import { useState, useRef } from "react";
import { connect } from "react-redux";

import { setFoodListOfCities, setWaterListOfCities } from "./mapActions";
import { setDimmer } from "../../../common/dimmerActions";
import styles from "./mapForm.module.css";
import food from "../../../images/food-bowl.svg";
import water from "../../../images/water-bowl.svg";
import submitFood from "./submitFood";
import submitWater from "./submitWater";

function MapForm({
	locationState,
	foodListOfCities,
	waterListOfCities,
	setFoodListOfCities,
	setWaterListOfCities,
	setDimmer,
}) {
	const [foodTime, setFoodTime] = useState(false);
	const [waterTime, setWaterTime] = useState(false);
	const ref = useRef("");

	const submitFoodArgs = {
		locationState,
		foodTime,
		setFoodTime,
		ref,
		setFoodListOfCities,
		foodListOfCities,
		setDimmer,
	};
	const submitWaterArgs = {
		locationState,
		waterTime,
		setWaterTime,
		ref,
		setWaterListOfCities,
		waterListOfCities,
		setDimmer,
	};

	return (
		<div className={styles.form}>
			<h1>Kindness is yours</h1>
			<p>
				“The way you treat the animals around you will be the nature of the
				animal within you”
			</p>
			<p className={styles.formP}> ― Sir P.S. Jagadeesh Kumar</p>
			<div className={styles.formGroup}>
				<div className={styles.inputGroup}>
					<input
						type="text"
						id="info"
						placeholder=" info (optional)"
						ref={ref}
					/>
				</div>
				<div className={styles.buttonGroup}>
					<button onClick={() => submitFood(submitFoodArgs)}>
						<img src={food} alt="" />
						food
					</button>
					<button onClick={() => submitWater(submitWaterArgs)}>
						<img src={water} alt="" />
						water
					</button>
				</div>
			</div>
		</div>
	);
}

const mapStateToProps = (state) => {
	return {
		locationState: state.locationState,
		foodListOfCities: state.foodListOfCities,
		waterListOfCities: state.waterListOfCities,
	};
};

export default connect(mapStateToProps, {
	setFoodListOfCities,
	setWaterListOfCities,
	setDimmer,
})(MapForm);
