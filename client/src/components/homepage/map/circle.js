import { axi } from "../../../utils/config";
import xicon from "../../../images/xxx.png";

export function deleteCircle(id, cityCircle, xmarker, circleType) {
	const arg = { id: id };
	return axi("delete", `/${circleType}`, { data: arg })
		.then((res) => {
			cityCircle.setMap(null);
			xmarker.setMap(null);
		})
		.catch(console.log);
}

export function addFoodCircle(
	map,
	cityList,
	user = " ",
	setFoodListOfCities,
	setModal,
	setModalVisibility
) {
	cityList.forEach((each) => {
		const cityFoodCircle = new window.google.maps.Circle({
			strokeColor: user === each.email ? "purple" : "green",
			strokeOpacity: 0.8,
			strokeWeight: 1,
			fillColor: "green",
			fillOpacity: 0.35,
			map,
			center: { lat: each.lat, lng: each.lng },
			radius: 100,
		});
		if (each.info) {
			const infowindow = new window.google.maps.InfoWindow({
				content: each.info,
				position: { lat: each.lat, lng: each.lng },
			});
			cityFoodCircle.addListener("click", () => {
				infowindow.open(map, cityFoodCircle);
			});
		}
		if (each.email === user) {
			cityFoodCircle.addListener("click", () => {
				const xmarker = new window.google.maps.Marker({
					position: { lat: each.lat + 0.00065, lng: each.lng + 0.00065 },
					map,
					title: "undo circle",
					icon: xicon,
				});
				xmarker.addListener("click", () => {
					setModal({
						id: each.id,
						cityCircle: cityFoodCircle,
						xmarker: xmarker,
						circleType: "food",
					});
					setModalVisibility(true);
				});
				map.addListener("dragstart", () => {
					xmarker.setMap(null);
				});
			});
		}
	});
}

export function addWaterCircle(
	map,
	cityList,
	user = " ",
	setWaterListOfCities,
	setModal,
	setModalVisibility
) {
	cityList.forEach((each) => {
		const cityWaterCircle = new window.google.maps.Circle({
			strokeColor: user === each.email ? "purple" : "blue",
			strokeOpacity: 0.8,
			strokeWeight: 1,
			fillColor: "blue",
			fillOpacity: 0.35,
			map,
			center: { lat: each.lat, lng: each.lng },
			radius: 100,
		});
		if (each.info) {
			const infowindow = new window.google.maps.InfoWindow({
				content: each.info,
				position: { lat: each.lat, lng: each.lng },
			});
			cityWaterCircle.addListener("click", () => {
				infowindow.open(map, cityWaterCircle);
			});
		}
		if (each.email === user) {
			cityWaterCircle.addListener("click", () => {
				const xmarker = new window.google.maps.Marker({
					position: { lat: each.lat + 0.00065, lng: each.lng + 0.00065 },
					map,
					title: "undo circle",
					icon: xicon,
				});
				xmarker.addListener("click", () => {
					setModal({
						id: each.id,
						cityCircle: cityWaterCircle,
						xmarker: xmarker,
						circleType: "water",
					});
					setModalVisibility(true);
				});
				map.addListener("dragstart", () => {
					xmarker.setMap(null);
				});
			});
		}
	});
}
