import { useState, useEffect, useRef } from "react";

function useLocationStates() {
	const [initLocation, setInitLocation] = useState({ lat: 0, lng: 0 });
	const [locationState, setLocationState] = useState({ lat: 0, lng: 0 });
	const [errorCode, setErrorCode] = useState(0);
	const id = useRef(0);

	useEffect(
		() => {
			id.current = navigator.geolocation.watchPosition(
				(l) => {
					setLocationState({
						lat: l.coords.latitude,
						lng: l.coords.longitude,
					});
				},
				(err) => {
					setErrorCode(err.code);
					console.log("watchPosition error occour ", err);
				},
				{ timeout: 15000 }
			);
			return () => {
				navigator.geolocation.clearWatch(id.current);
			};
		},
		//eslint-disable-next-line
		[]
	);
	useEffect(
		() => {
			if (
				(initLocation.lat === 0 || initLocation.lng === 0) &&
				(locationState.lat !== 0 || locationState.lng !== 0)
			)
				setInitLocation(locationState);
		},
		//eslint-disable-next-line
		[locationState]
	);

	return [initLocation, locationState, errorCode];
}

export default useLocationStates;
