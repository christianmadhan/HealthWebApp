import * as $  from "../../node_modules/jquery/dist/jquery";
import axios, {
  AxiosResponse,
  AxiosError
} from "../../node_modules/axios/index";

let loggedInUserId = parseInt(localStorage.getItem("key"));

let profilePic: HTMLImageElement = <HTMLImageElement>document.getElementById("ProfileAvatar");
let myOwnHealthData: IHealthData[] = [];
let HeartRateMessurement:any = [];
let heightData:any = new Array();
let smokerAlert = 0;
let SmokerText:any;
var options:any = [];
export default options;


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
  recordTime: Date
}

$(document).ready(function() {
    let getStoredUserID = localStorage.getItem("key");
    let LoggedInUserID = parseInt(getStoredUserID);
     profilePic.src = "assets/img/avatar" + LoggedInUserID + ".jpg";
     console.log();


     let uri: string = "https://berthaprojectusersapi.azurewebsites.net/api/HealthDatas/";

     axios.get(uri)
     .then(function(response) {
       // Works when compiled
       response.data.forEach((element:any) => {
           if(element.userID == loggedInUserId){
             myOwnHealthData.push(element);
           }
       })
     });
     console.log(myOwnHealthData);
   setTimeout(loadSomething, 100);
  });



function loadSomething():void {

 myOwnHealthData.forEach(element => {
      if(element.isSmoker == 1){
        smokerAlert++;
      }
      HeartRateMessurement.push(element.heartRate);
      heightData.push(element.height);
  });
  HeartRateMessurement.sort();
  heightData.sort();
  console.log(heightData);

  if(smokerAlert > 10){
    SmokerText = " , You should properly cut down on cigerattes";
  }
  if(smokerAlert < 10 && smokerAlert > 0){
    SmokerText = ", You dont smoke that much, but it's still damaging"
  }
  options.push("You have smoked: " + smokerAlert + " times " + SmokerText);
  options.push("Your highest messured Heartrate was: " + HeartRateMessurement[0] + " And your lowest was: " + HeartRateMessurement[HeartRateMessurement.length-1]);
  options.push("Your highest recorded hight was: " + heightData[heightData.length -1] + "cm" + " You and lowest was: " + heightData[0] + "cm");
  document.getElementById('myBestList').appendChild(makeUL(options));
}

function makeUL(array:any) {
  // Create the list element:
  var list = document.createElement('ul');
  list.classList.add("list-group");

  for(var i = 0; i < array.length; i++) {
      // Create the list item:
      var item = document.createElement('li');

      // Set its contents:
      item.classList.add("list-group-item")
      item.style.color = "black";
      item.appendChild(document.createTextNode(array[i]));
      // Add it to the list:
      list.appendChild(item);
              
  }

  // Finally, return the constructed list:
  return list;
}



