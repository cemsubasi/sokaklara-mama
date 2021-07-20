import { axi } from "../../../utils/config";

function submitFood({
	locationState,
	foodTime,
	setFoodTime,
	ref,
	setFoodListOfCities,
	foodListOfCities,
	setDimmer,
}) {
	setTimeout(() => {
		setFoodTime(false);
	}, 15000);
	const arg = {
		id: Date.now(),
		lat: locationState.lat,
		lng: locationState.lng,
		info: ref.current.value,
		token: localStorage.getItem("token"),
	};
	if (foodTime)
		return setDimmer({
			visibility: true,
			payload: {
				type: "info",
				message: {
					head: "Cannot send request immediately",
					body: "You have to wait 15s before to add more circle",
				},
			},
			timeout: 2000,
		});
	setFoodTime(true);
	return axi("post", "/food", arg)
		.then((res) => {
			if (res.status === "accepted") {
				ref.current.value = "";
				console.log("res.response", res.response);
				return setFoodListOfCities([...foodListOfCities, res.response]);
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

export default submitFood;
