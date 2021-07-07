import styles from "./spinner.module.css";

function Spinner() {
	return (
		<div className={styles.spinnerGroup}>
			<div className={styles.spinnerBody}></div>
			<p className={styles.spinnerP}>Loading...</p>
		</div>
	);
}

export default Spinner;
