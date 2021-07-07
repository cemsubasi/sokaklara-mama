import { axi } from "../../../utils/config";
import xicon from "../../../images/xxx.png";

function deleteFoodCircle(id, cityCircle) {
	const arg = { id: id };
	return axi("delete", "/food", { data: arg })
		.then((res) => {
			cityCircle.setMap(null);
		})
		.catch(console.log);
}
function deleteWaterCircle(id, cityCircle) {
	const arg = { id: id };
	return axi("delete", "/water", { data: arg })
		.then((res) => {
			cityCircle.setMap(null);
		})
		.catch(console.log);
}

export function addFoodCircle(map, cityList, user = " ", setFoodListOfCities) {
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
					deleteFoodCircle(each.id, cityFoodCircle);
					setFoodListOfCities(cityList.filter((e) => e.id !== each.id));
					xmarker.setMap(null);
					alert("Deleted");
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
	setWaterListOfCities
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
					deleteWaterCircle(each.id, cityWaterCircle);
					setWaterListOfCities(cityList.filter((e) => e.id !== each.id));
					xmarker.setMap(null);
					alert("Deleted");
				});
				map.addListener("dragstart", () => {
					xmarker.setMap(null);
				});
			});
		}
	});
}
