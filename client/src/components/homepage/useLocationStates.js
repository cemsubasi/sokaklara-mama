import { useState, useEffect, useRef } from "react";

function useLocationStates() {
	const [initLocation, setInitLocation] = useState({ lat: 0, lng: 0 });
	const [locationState, setLocationState] = useState({ lat: 0, lng: 0 });
	const id = useRef(0);

	useEffect(() => {
		if (
			navigator.userAgent.toLowerCase().includes("android") &&
			navigator.userAgent.toLowerCase().includes("firefox")
		)
			alert(
				"firefox mobile browser has a geolocation service issue, please use other browsers to avoid location issues"
			);
	}, []);

	useEffect(
		() => {
			navigator.geolocation.getCurrentPosition(
				(l) => {
					setInitLocation({ lat: l.coords.latitude, lng: l.coords.longitude });
					setLocationState({ lat: l.coords.latitude, lng: l.coords.longitude });
				},
				(err) => console.log("getCurrentPosition error occour ", err),
				{ timeout: 15000 }
			);
			id.current = navigator.geolocation.watchPosition(
				(l) => {
					setLocationState({
						lat: l.coords.latitude,
						lng: l.coords.longitude,
					});
				},
				(err) => console.log("watchPosition error occour ", err),
				{ timeout: 15000 }
			);
			return () => {
				navigator.geolocation.clearWatch(id.current);
			};
		},
		//eslint-disable-next-line
		[]
	);
	return [initLocation, locationState];
}

export default useLocationStates;
