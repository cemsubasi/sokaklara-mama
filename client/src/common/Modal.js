import { connect } from "react-redux";

import styles from "./modal.module.css";
import foodIcon from "../images/white-food-bowl.png";
import waterIcon from "../images/white-water-bowl.png";
import { setModalVisibility } from "./modalActions";
import {
	setFoodListOfCities,
	setWaterListOfCities,
} from "../components/homepage/map/mapActions";
import { deleteCircle } from "../components/homepage/map/circle";

function Modal({
	modalPayload,
	modalVisibility,
	setModalVisibility,
	setFoodListOfCities,
	setWaterListOfCities,
	foodListOfCities,
	waterListOfCities,
}) {
	function submit() {
		if (modalPayload.circleType === "food") {
			setFoodListOfCities(
				foodListOfCities.filter((e) => e.id !== modalPayload.id)
			);
			deleteCircle(
				modalPayload.id,
				modalPayload.cityCircle,
				modalPayload.xmarker,
				modalPayload.circleType
			);
			return setModalVisibility(false);
		}
		setWaterListOfCities(
			waterListOfCities.filter((e) => e.id !== modalPayload.id)
		);
		deleteCircle(
			modalPayload.id,
			modalPayload.cityCircle,
			modalPayload.xmarker,
			modalPayload.circleType
		);
		return setModalVisibility(false);
	}

	return (
		<div
			style={modalVisibility ? { display: "flex" } : { display: "none" }}
			className={styles.modalContainer}
		>
			<div className={styles.modalGroup}>
				<div className={styles.modalHead}>
					<img
						src={modalPayload.circleType === "food" ? foodIcon : waterIcon}
						className={styles.petBowl}
						alt=""
					/>
					<h3>Cancel {modalPayload.circleType} Circle</h3>
				</div>
				<div className={styles.modalBody}>
					<p>Do you want to cancel to circle?</p>
				</div>
				<div className={styles.modalButtons}>
					<div>
						<button onClick={submit} className={styles.positive}>
							Yes
						</button>
					</div>
					<div>
						<button
							onClick={() => setModalVisibility(false)}
							className={styles.negative}
						>
							No
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}

const mapStateToProps = (state) => {
	return {
		foodListOfCities: state.foodListOfCities,
		waterListOfCities: state.waterListOfCities,
		modalVisibility: state.modal.visibility,
		modalPayload: state.modal.payload,
	};
};

export default connect(mapStateToProps, {
	setModalVisibility,
	setFoodListOfCities,
	setWaterListOfCities,
})(Modal);
