import MarkIcon from "./MarkIcon";

function CenterButton(props) {
	return (
		<div
			ref={props.centerElement}
			style={{
				backgroundColor: "#fff",
				border: "2px solid #fff",
				borderRadius: "3px",
				boxShadow: "0 2px 6px rgba(0,0,0,.3)",
				cursor: "pointer",
				marginBottom: "22px",
				textAlign: "center",
				marginRight: "10px",
				top: "null",
				display: props.loaded ? "block" : "none",
			}}
			onClick={() => {
				props.map.current.setCenter(props.locationState);
			}}
		>
			<MarkIcon />
		</div>
	);
}

export default CenterButton;
