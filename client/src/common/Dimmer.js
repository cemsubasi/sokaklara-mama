import { connect } from "react-redux";
import { useEffect } from "react";

import styles from "./dimmer.module.css";
import { setDimmer } from "./dimmerActions";
import locationIcon from "../images/white-location.png";
import heartIcon from "../images/white-multi-heart.png";
import infoIcon from "../images/white-info.png";
import errorIcon from "../images/white-user-not-found.png";

function Dimmer({ dimmer, setDimmer }) {
	useEffect(
		() => {
			function handleVisibility() {
				setTimeout(() => {
					setDimmer({
						visibility: false,
						payload: { type: "", message: { head: "", body: "" } },
						timeout: 800,
					});
				}, dimmer.timeout);
			}
			if (dimmer.visibility) handleVisibility();
		},
		//eslint-disable-next-line
		[dimmer.visibility]
	);

	return (
		<div
			style={dimmer.visibility ? { display: "flex" } : { display: "none" }}
			className={styles.modalContainer}
		>
			<div className={styles.modalGroup}>
				<div className={styles.modalHead}>
					<img
						src={
							dimmer.payload.type === "location"
								? locationIcon
								: dimmer.payload.type === "info"
								? infoIcon
								: dimmer.payload.type === "success"
								? heartIcon
								: dimmer.payload.type === "error"
								? errorIcon
								: null
						}
						className={styles.petBowl}
						alt=""
					/>
					<h3>{dimmer.payload.message.head}</h3>
				</div>
				<div className={styles.modalBody}>
					<p>{dimmer.payload.message.body}</p>
				</div>
			</div>
		</div>
	);
}

const mapStateToProps = (state) => {
	return {
		dimmer: state.dimmer,
	};
};

export default connect(mapStateToProps, { setDimmer })(Dimmer);
