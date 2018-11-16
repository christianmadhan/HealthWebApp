import * as $  from "../../node_modules/jquery/dist/jquery";
import * as L from "../../node_modules/leaflet/dist/leaflet-src";
let profilePic: HTMLImageElement = <HTMLImageElement>document.getElementById("ProfileAvatar");
let leafMap: HTMLDivElement = <HTMLDivElement>document.getElementById("mapid");

$(document).ready(function() {
    let getStoredUserID = localStorage.getItem("key");
    let LoggedInUserID = parseInt(getStoredUserID);
     profilePic.src = "assets/img/avatar" + LoggedInUserID + ".jpg";
   });



   var mymap = L.map(leafMap).setView([51.505, -0.09], 13);
    
 	L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
		maxZoom: 18,
		attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
			'<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
			'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
		id: 'mapbox.streets'
	}).addTo(mymap);

  /* 
  https://www.latlong.net/
  You can find lat and long on this website by typing in adresses.
  use that location to put a marker on your map as shown below
  
  */
   L.marker([55.625004, 12.074238]).addTo(mymap)
     .bindPopup("<b>Hello world!</b><br />I am a popup.").openPopup();
 
 
   var popup = L.popup();
 
   function onMapClick(e:any) {
     popup
       .setLatLng(e.latlng)
       .setContent("You clicked the map at " + e.latlng.toString())
       .openOn(mymap);
   }
 
   mymap.on('click', onMapClick);
  
   function onLocationFound(e:any) {
		var radius = e.accuracy / 2;

		L.marker(e.latlng).addTo(mymap)
			.bindPopup("You are within " + radius + " meters from this point").openPopup();

		L.circle(e.latlng, radius).addTo(mymap);
  }
  
  mymap.on('locationfound', onLocationFound);

  // If you give consent it will show your exact location
  mymap.locate({setView: true, maxZoom: 16});
