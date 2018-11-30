import axios, {
    AxiosResponse,
    AxiosError
} from "../../node_modules/axios";
import * as $  from "../../node_modules/jquery/dist/jquery";

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

/* GET ALL HEALTHDATA */

let getdatabtn: HTMLButtonElement = <HTMLButtonElement>document.getElementById("getdatabutton");
let profilePic: HTMLImageElement = <HTMLImageElement>document.getElementById("ProfileAvatar");
getdatabtn.addEventListener("click", doGetAll);

let localuserid: number = parseInt(localStorage.getItem("key"));
console.log("local user ID: " + localuserid);

function doGetAll(): void {
    let uri: string = "https://berthaprojectusersapi.azurewebsites.net/api/HealthDatas/";

    axios.get<IHealthData[]>(uri)
        .then(function (response: AxiosResponse<IHealthData[]>): void {
            console.log(response.data);
            let result: string = "";
            let smokerstatus: string = "No data";

            response.data.forEach((hd: IHealthData) => {
                if (hd.isSmoker === 0){ smokerstatus = "No" } else { smokerstatus = "Yes" };
                if (hd.userID === localuserid){
                    result += "<tr><td>" + hd.id + "</td><td>" + hd.weight + " kg</td><td>" + hd.height + " cm</td><td>" + smokerstatus + "</td><td>" + hd.bloodPressure + " mmHg</td><td>" + hd.heartRate + " bpm</td><td>" + hd.latitude + "</td><td>" + hd.longitude + "</td><td>" + hd.recordTime + "</td></tr>";
                }                
            });
            console.log(result);

            let tablecontent: HTMLTableElement = <HTMLTableElement>document.getElementById("simpletablecontent");
            tablecontent.innerHTML = result;
        })
        .catch(function (error: AxiosError): void {
            console.log(error);
        })
}

$(document).ready(function() {
    let getStoredUserID = localStorage.getItem("key");
    let LoggedInUserID = parseInt(getStoredUserID);
     profilePic.src = "assets/img/avatar" + LoggedInUserID + ".jpg";
   });