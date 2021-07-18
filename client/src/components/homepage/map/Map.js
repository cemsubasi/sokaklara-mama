import { Loader } from "@googlemaps/js-api-loader";
import { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";

import { axi } from "../../../utils/config";
import { setFoodListOfCities, setWaterListOfCities } from "./mapActions";
import { setModal, setModalVisibility } from "../../../common/modalActions";
import { addFoodCircle, addWaterCircle } from "./circle";
import CenterButton from "./CenterButton";
import Spinner from "../../../common/Spinner";
import addMarker from "./addMarker";
import styles from "./map.module.css";

function Map(props) {
	const [loaded, setLoaded] = useState(false);
	const mapElement = useRef(null);
	const centerElement = useRef(null);
	const map = useRef({});
	const markerRef = useRef(null);

	useEffect(
		() => {
			const loader = new Loader({
				apiKey:
					process.env.NODE_ENV === "production"
						? props.apiKey
						: "AIzaSyDit4G0bMDP54KRwVqRTzvFtFGMNPRt_mo",
				version: "weekly",
				libraries: ["places"],
			});

			if (
				!props.initLocation ||
				(props.initLocation.lat === 0 && props.initLocation.lng === 0)
			)
				return;

			loader
				.load()
				.then(() => {
					map.current = new window.google.maps.Map(mapElement.current, {
						zoom: 16,
						center: props.initLocation,
						scaleControl: false,
						streetViewControl: false,
						rotateControl: false,
						mapTypeControl: false,
					});
					map.current.controls[
						window.google.maps.ControlPosition.RIGHT_BOTTOM
					].push(centerElement.current);
					addMarker(markerRef, props.initLocation, map.current);
					addFoodCircle(
						map.current,
						props.foodListOfCities,
						props.user,
						props.setFoodListOfCities,
						props.setModal,
						props.setModalVisibility
					);
					addWaterCircle(
						map.current,
						props.waterListOfCities,
						props.user,
						props.setWaterListOfCities,
						props.setModal,
						props.setModalVisibility
					);
					setLoaded(true);
				})
				.catch(console.log)
				.then(() => {
					axi("get", "/food")
						.then((res) => {
							props.setFoodListOfCities(res.response);
						})
						.catch(console.log);
					axi("get", "/water")
						.then((res) => {
							props.setWaterListOfCities(res.response);
						})
						.catch(console.log);
				})
				.catch(console.log);
		},
		//eslint-disable-next-line
		[props.initLocation]
	);

	useEffect(
		() => {
			if (map.current) {
				addFoodCircle(
					map.current,
					props.foodListOfCities,
					props.user,
					props.setFoodListOfCities,
					props.setModal,
					props.setModalVisibility
				);
			}
		},
		//eslint-disable-next-line
		[props.foodListOfCities]
	);
	useEffect(
		() => {
			if (map.current) {
				addWaterCircle(
					map.current,
					props.waterListOfCities,
					props.user,
					props.setWaterListOfCities,
					props.setModal,
					props.setModalVisibility
				);
			}
		},
		//eslint-disable-next-line
		[props.waterListOfCities]
	);

	useEffect(() => {
		if (
			markerRef.current &&
			(props.locationState.lat !== 0 || props.locationState.lng !== 0)
		) {
			markerRef.current.setMap(null);
			addMarker(markerRef, props.locationState, map.current);
		}
	}, [props.locationState]);

	return (
		<>
			<div
				className={styles.map}
				style={loaded ? {} : { display: "none" }}
				ref={mapElement}
			>
				<CenterButton
					centerElement={centerElement}
					map={map}
					locationState={props.locationState}
					loaded={loaded}
				/>
			</div>
			<div
				style={
					loaded
						? { display: "none" }
						: {
								display: "flex",
								alignItems: "center",
								justifyContent: "center",
								height: "100%",
						  }
				}
			>
				<Spinner />
			</div>
		</>
	);
}

const mapStateToProps = (state) => {
	return {
		user: state.user,
		initLocation: state.initLocation,
		locationState: state.locationState,
		foodListOfCities: state.foodListOfCities,
		waterListOfCities: state.waterListOfCities,
		modalVisibility: state.modalVisibility,
	};
};

export default connect(mapStateToProps, {
	setFoodListOfCities,
	setWaterListOfCities,
	setModal,
	setModalVisibility,
})(Map);
