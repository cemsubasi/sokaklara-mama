import icon from "../../../images/mylocation-sprite-1x.png";

function addMarker(marker, myLatLng, map) {
	marker.current = new window.google.maps.Marker({
		position: myLatLng,
		map,
		title: "You are here",
		icon: icon,
	});
}

export default addMarker;
