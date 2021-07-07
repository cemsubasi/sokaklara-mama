import { axi } from "../../../utils/config";

function submitFood({
	locationState,
	foodTime,
	setFoodTime,
	ref,
	setFoodListOfCities,
	foodListOfCities,
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
	if (foodTime) return alert("You cannot send request immediately");
	setFoodTime(true);
	return axi("post", "/food", arg)
		.then((res) => {
			if (res.status === "accepted") {
				ref.current.value = "";
				console.log("res.response", res.response);
				return setFoodListOfCities([...foodListOfCities, res.response]);
			}
			alert(res.info);
		})
		.catch((err) => console.log("submit error", err));
}

export default submitFood;
