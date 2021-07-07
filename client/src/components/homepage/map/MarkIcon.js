import icongray from "../../../images/button-gray.png";

function MarkIcon() {
	return (
		<div
			style={{
				color: "rgb(25,25,25)",
				fontFamily: "Roboto,Arial,sans-serif",
				fontSize: "24px",
				lineHeight: "36px",
				paddingLeft: "9px",
				paddingRight: "9px",
			}}
		>
			<img src={icongray} alt="" />
		</div>
	);
}

export default MarkIcon;
