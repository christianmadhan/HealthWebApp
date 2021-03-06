import axios, {
    AxiosResponse,
    AxiosError
} from "../../node_modules/axios/index";
import * as $  from "../../node_modules/jquery/dist/jquery";
import * as rssparser from "../../node_modules/rss-parser/dist/rss-parser";


let loggedInUserId = parseInt(localStorage.getItem("key"));

let firstname : HTMLSpanElement = <HTMLSpanElement> document.getElementById("firstname");

let user : IUser

interface IUser {
    firstName: string;
}

$(document).ready(function() {
    loadUserData();    
});


function loadUserData() : void {
     
    try {


        let uri: string = "https://berthaprojectusersapi.azurewebsites.net/api/Users/" + loggedInUserId.toString();
        axios.get<IUser>(uri)
        .then((Response : AxiosResponse<IUser>)=>{ 
            let user : IUser = Response.data
            
            firstname.innerHTML = user.firstName
        }) 
             
    } catch (AxiosError) {
        console.log(AxiosError)
    }
}


let profilePic: HTMLImageElement = <HTMLImageElement>document.getElementById("ProfileAvatar");

$(document).ready(function() {
    let getStoredUserID = localStorage.getItem("key");
    let LoggedInUserID = parseInt(getStoredUserID);
     profilePic.src = "assets/img/avatar" + LoggedInUserID + ".jpg";

    getBMIData();
});




interface IBMIData {
    weight: number;
    height: number;
    userID: number;
}

let localuserid: number = parseInt(localStorage.getItem("key"));

function getBMIData(): void {
    let uri: string = "https://berthaprojectusersapi.azurewebsites.net/api/HealthDatas/";

    axios.get<IBMIData[]>(uri)
        .then(function (response: AxiosResponse<IBMIData[]>): void {
            let resultweight: number;
            let resultheight: number;

            response.data.forEach((hd: IBMIData) => {
                if (hd.userID === localuserid){
                    resultweight = hd.weight;
                    resultheight = hd.height;
                }
            });
            console.log(resultweight + " | " + resultheight);

            let bminmbr: number = (Math.round(((resultweight / ((resultheight/100) * (resultheight/100))))));
            let bmicolour: string = "";

            /* Under 18.5 – you are considered underweight and possibly malnourished.
            18.5 to 24.9 – you are within a healthy weight range for young and middle-aged adults.
            25.0 to 29.9 – you are considered overweight.
            Over 30 – you are considered obese.*/
            if (bminmbr < 19) {bmicolour="#9beeff"} else if (bminmbr >= 19 && bminmbr < 25) {bmicolour="#3fff62"} else if (bminmbr >= 25) {bmicolour="#ff0a0a"}
            
            let bmiinfo: HTMLDivElement = <HTMLDivElement>document.getElementById("bmibox");
            bmiinfo.innerHTML = "BMI: <font color=&quot;${bmicolour}&quot;>" + bminmbr + "</font>";
        })
        .catch(function (error: AxiosError): void {
            console.log(error);
        })
}
