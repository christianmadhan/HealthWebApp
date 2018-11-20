import axios, {
    AxiosResponse,
    AxiosError
} from "../../node_modules/axios/index";
import * as $  from "../../node_modules/jquery/dist/jquery";


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

