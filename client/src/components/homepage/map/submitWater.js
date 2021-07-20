import { axi } from "../../../utils/config";

function submitWater({
	locationState,
	waterTime,
	setWaterTime,
	ref,
	setWaterListOfCities,
	waterListOfCities,
	setDimmer,
}) {
	setTimeout(() => {
		setWaterTime(false);
	}, 15000);
	const arg = {
		id: Date.now(),
		lat: locationState.lat,
		lng: locationState.lng,
		info: ref.current.value,
		token: localStorage.getItem("token"),
	};
	if (waterTime)
		return setDimmer({
			visibility: true,
			payload: {
				type: "info",
				message: {
					head: "Cannot send request immediately",
					body: "You have to wait 15s before to add new circle",
				},
			},
			timeout: 2000,
		});

	setWaterTime(true);
	return axi("post", "/water", arg)
		.then((res) => {
			if (res.status === "accepted") {
				ref.current.value = "";
				return setWaterListOfCities([...waterListOfCities, res.response]);
			}
			return setDimmer({
				visibility: true,
				payload: {
					type: "info",
					message: {
						head: "The request is denied",
						body: res.info,
					},
				},
				timeout: 2000,
			});
		})
		.catch((err) => console.log("submit error", err));
}

export default submitWater;
