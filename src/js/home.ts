import axios, {
    AxiosResponse,
    AxiosError
} from "../../node_modules/axios/index";
import * as $  from "../../node_modules/jquery/dist/jquery";

// Works when compiled.
import {Chart}  from "../../node_modules/chart.js/dist/Chart.js"; 


let loggedInUserId = parseInt(localStorage.getItem("key"));

let firstname : HTMLSpanElement = <HTMLSpanElement> document.getElementById("firstname");

let user : IUser

interface IUser {
    firstName: string;
}

$(document).ready(function() {
    let getStoredUserID = localStorage.getItem("key");
    let loggedInUserId = parseInt(getStoredUserID);
    loadUserData();
});

 function loadUserData() : void {
     
    try {


        let uri: string = "https://berthaprojectusersapi.azurewebsites.net/api/Users/" + loggedInUserId.toString();
        axios.get<IUser>(uri)
        .then((Response : AxiosResponse<IUser>)=>{ 
            let user : IUser = Response.data
            console.log(user) 
            
            firstname.innerHTML = user.firstName
        }) 
             
    } catch (AxiosError) {
        console.log(AxiosError)
    }
}


$(document).ready(function(){

    let DustData:any = [];
    let uri = "https://berthaprojectusersapi.azurewebsites.net/api/Pollution";
    axios.get(uri)
    .then(function(response) {
      // Works when compiled
      response.data.forEach((element:any) => {
          DustData.push(element.dustPercentage);
          //myBloodPressureData.push(parseInt(element.bloodPressure));
      });

    var canvasChart = document.getElementById("pollution-chart");
    new Chart(canvasChart, {
      type: 'line',
      data: {
        labels: [10,20,30,40,50,60,70,80,90,100,200,300,400,500],
        datasets: [{ 
            data: DustData,
            label: "Dust",
            borderColor: "#3e95cd",
            fill: true
          }
        ]
      },
      options: {
        title: {
          display: true,
          text: 'Dust Data'
        }
      }
    });
});



$(document).ready(function(){

    let sulphurDioxidePercentageData:any = [];
    let uri = "https://berthaprojectusersapi.azurewebsites.net/api/Pollution";
    axios.get(uri)
    .then(function(response) {
      // Works when compiled
      response.data.forEach((element:any) => {
        sulphurDioxidePercentageData.push(element.sulphurDioxidePercentage);
          //myBloodPressureData.push(parseInt(element.bloodPressure));
      });

    var canvasChart = document.getElementById("pollution2-chart");
    new Chart(canvasChart, {
      type: 'line',
      data: {
        labels: [10,20,30,40,50,60,70,80,90,100,200,300,400,500],
        datasets: [{ 
            data: sulphurDioxidePercentageData,
            label: "Sulphur Dioxide",
            borderColor: "#3e95cd",
            fill: true
          }
        ]
      },
      options: {
        title: {
          display: true,
          text: 'Sulphur Data'
        }
      }
    });
});

$(document).ready(function(){

    let oxidizedNitrogenCompoundPercentageData:any = [];
    let uri = "https://berthaprojectusersapi.azurewebsites.net/api/Pollution";
    axios.get(uri)
    .then(function(response) {
      // Works when compiled
      response.data.forEach((element:any) => {
        oxidizedNitrogenCompoundPercentageData.push(element.oxidizedNitrogenCompoundPercentage);
          //myBloodPressureData.push(parseInt(element.bloodPressure));
      });

    var canvasChart = document.getElementById("pollution3-chart");
    new Chart(canvasChart, {
      type: 'line',
      data: {
        labels: [10,20,30,40,50,60,70,80,90,100,200,300,400,500],
        datasets: [{ 
            data: oxidizedNitrogenCompoundPercentageData,
            label: "Oxidized Nitrogen Compound",
            borderColor: "#3e95cd",
            fill: true
          }
        ]
      },
      options: {
        title: {
          display: true,
          text: 'Oxidized Nitrogen Compound Data'
        }
      }
    });
});


$(document).ready(function(){

    let fluorinePercentageData:any = [];
    let uri = "https://berthaprojectusersapi.azurewebsites.net/api/Pollution";
    axios.get(uri)
    .then(function(response) {
      // Works when compiled
      response.data.forEach((element:any) => {
        fluorinePercentageData.push(element.fluorinePercentage);
          //myBloodPressureData.push(parseInt(element.bloodPressure));
      });

    var canvasChart = document.getElementById("pollution4-chart");
    new Chart(canvasChart, {
      type: 'line',
      data: {
        labels: [10,15,20,25,30,35,40,45,50,55,60],
        datasets: [{ 
            data: fluorinePercentageData,
            label: "Fluorine",
            borderColor: "#3e95cd",
            fill: true
          }
        ]
      },
      options: {
        title: {
          display: true,
          text: 'fluorine Data'
        }
      }
    });
});