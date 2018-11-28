import * as $  from "../../node_modules/jquery/dist/jquery";
import * as L from "../../node_modules/leaflet/dist/leaflet-src";
import axios, {AxiosResponse, AxiosError } from "../../node_modules/axios/index";

// Init elements
let dataDropDown : HTMLSelectElement = <HTMLSelectElement> document.getElementById("dataDropDown");
let datePicker : HTMLInputElement = <HTMLInputElement> document.getElementById("datePicker");
let mapDropDown: HTMLSelectElement = <HTMLSelectElement> document.getElementById("mapDropDown");
let profilePic: HTMLImageElement = <HTMLImageElement>document.getElementById("ProfileAvatar");
let leafMap: HTMLDivElement = <HTMLDivElement>document.getElementById("mapid");
let changeMapBtn: HTMLButtonElement = <HTMLButtonElement>document.getElementById("changeBtn");
let marker1;
changeMapBtn.addEventListener("click", ChangeMap)

//Interfaces
interface IHealthData {
  id: number;
  weight: number;
  height: number;
  isSmoker: number;
  bloodPressure: string;
  heartRate: number;
  userID: number;
  latitude: number;
  longitude: number;
  recordTime: Date;
}

interface IPollution {
  id: number,
  dustPercentage: string,
  sulphurDioxidePercentage: string,
  oxidizedNitrogenCompoundPercentage: string,
  fluorinePercentage: string,
  carbonMonoxidPercentage: string,
  ozonePercentage : string,
  latitude: number,
  longitude : number,
  recordTime: Date,
}


// Doc ready + Win onload
$(document).ready(function() {
    let getStoredUserID = parseInt(localStorage.getItem("key"));
     profilePic.src = "assets/img/avatar" + getStoredUserID + ".jpg";
});

window.onload = () => {
  L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
	attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
  }).addTo(mymap);
};

//Map init
var mymap = L.map(leafMap).setView([51.505, -0.09], 13);

// Shows the position after clicking the map
var popup = L.popup();

function onMapClick(e:any) {
popup
 .setLatLng(e.latlng)
 .setContent("You clicked the map at " + e.latlng.toString())
 .openOn(mymap);     
}

//Location
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
  
function ChangeMap() : void {

  let date = datePicker.value
  console.log(date);

  let mapType : string = mapDropDown.value
  console.log(mapType);
  let dataType : string = dataDropDown.value
  console.log(dataType)

  
  if(dataType == "HealthData") {loadUserData(parseInt(localStorage.getItem("key")))}
  if(dataType == "PollutionData") { loadPollutionData()}
  

  if(mapType == "Default"){
    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
      maxZoom: 18,
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
        '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
        'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      id: 'mapbox.streets'
    }).addTo(mymap);
  }
  if(mapType == "Esri_WorldImagery"){
    L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
	attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
  }).addTo(mymap);
  }
}

// Pollution GETALL
function loadPollutionData() : void {
  try{
    let uri: string = "https://berthaprojectusersapi.azurewebsites.net/api/Pollution";
    axios.get<IPollution[]>(uri).then((Response : AxiosResponse<IPollution[]>) =>{
      let pollution : IPollution[] = Response.data 
      pollution.forEach(element => {
        let marke11 = L.marker([element.latitude, element.longitude]).addTo(mymap)
        });

    });
  }
  catch(AxiosError){console.log(AxiosError)}
}

// User's all HD
function loadUserData(id : number) : void {
  try {

    let uri: string = "https://berthaprojectusersapi.azurewebsites.net/api/HealthDatas/SpecificUsersHealthData/" + id;
        
      axios.get<IHealthData[]>(uri)
      .then((Response : AxiosResponse<IHealthData[]>)=>{ 
      let healthDatas : IHealthData[] = Response.data
      healthDatas.forEach(element => {
        let marke11 = L.marker([element.latitude, element.longitude]).addTo(mymap)
        marke11.bindPopup("HealthDatas<br>HearthRate:" + element.heartRate + "<br>BloodPreasure:" + element.bloodPressure ).openPopup(); 
        });
      
    })   
  }
  catch (AxiosError) {
    console.log(AxiosError)
  }
}
