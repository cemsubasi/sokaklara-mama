import { axi } from "../../../utils/config";

function submitWater({
	locationState,
	waterTime,
	setWaterTime,
	ref,
	setWaterListOfCities,
	waterListOfCities,
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
	if (waterTime) return alert("You cannot send request immediately");
	setWaterTime(true);
	return axi("post", "/water", arg)
		.then((res) => {
			if (res.status === "accepted") {
				ref.current.value = "";
				return setWaterListOfCities([...waterListOfCities, res.response]);
			}
			alert(res.info);
		})
		.catch((err) => console.log("submit error", err));
}

export default submitWater;
