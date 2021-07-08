import styles from "./modal.module.css";
import foodIcon from "../images/white-food-bowl.png";
import waterIcon from "../images/white-water-bowl.png";

function Modal({ modalVisibility, setModalVisibility }) {
	return (
		<div
			style={modalVisibility ? { display: "flex" } : { display: "none" }}
			className={styles.modalContainer}
		>
			<div className={styles.modalGroup}>
				<div className={styles.modalHead}>
					<img src={foodIcon} className={styles.petBowl} alt="" />
					<h3>Cancel Food Circle</h3>
				</div>
				<div className={styles.modalBody}>
					<p>Do you want to cancel to circle?</p>
				</div>
				<div className={styles.modalButtons}>
					<div>
						<button
							onClick={() => setModalVisibility(false)}
							className={styles.positive}
						>
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

export default Modal;
