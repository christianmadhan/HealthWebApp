import axios, {
    AxiosResponse,
    AxiosError
} from "../../node_modules/axios/index";
import * as $  from "../../node_modules/jquery/dist/jquery";


let loggedInUserId = parseInt(localStorage.getItem("key"));


let rightBox : HTMLInputElement = <HTMLInputElement> document.getElementById("rightBox");
let emailBox : HTMLInputElement = <HTMLInputElement> document.getElementById("emailBox");
let usernameBox : HTMLInputElement = <HTMLInputElement> document.getElementById("usernameBox");
let firstnameBox : HTMLInputElement = <HTMLInputElement> document.getElementById("firstNameBox");
let lastNameBox : HTMLInputElement = <HTMLInputElement> document.getElementById("lastNameBox");
let passwordBox : HTMLInputElement = <HTMLInputElement> document.getElementById("passwordBox");
let genderBox : HTMLInputElement = <HTMLInputElement> document.getElementById("genderBox");
let birthdateBox : HTMLInputElement = <HTMLInputElement> document.getElementById("birthDateBox");
let profilePic: HTMLImageElement = <HTMLImageElement>document.getElementById("ProfileAvatar");
let profilePic1: HTMLImageElement = <HTMLImageElement>document.getElementById("ProfileAvatar1");
let Quote: HTMLParagraphElement = <HTMLParagraphElement>document.getElementById("QuoteOfTheDay");
let profileName: HTMLHeadingElement = <HTMLHeadingElement>document.getElementById("ProfileName");

let user : IUser

interface IUser {
    id: number;
    isAdmin: number;
    userName: string;
    password: string;
    firstName: string;
    lastName: string;
    gender: string;
    birthDate: Date;
    email : string;
}

$(document).ready(function() {
    let getStoredUserID = localStorage.getItem("key");
    let LoggedInUserID = parseInt(getStoredUserID);
    profilePic.src = "assets/img/avatar" + LoggedInUserID + ".jpg";
    profilePic1.src = "assets/img/avatar" + LoggedInUserID + ".jpg"; 
    loadUserData();
    getQuote();
});

 function loadUserData() : void {
     
    try {


        let uri: string = "https://berthaprojectusersapi.azurewebsites.net/api/Users/" + loggedInUserId.toString();
        axios.get<IUser>(uri)
        .then((Response : AxiosResponse<IUser>)=>{ 
            let user : IUser = Response.data
            console.log(user) 
            
            if(user.isAdmin == 0){ rightBox.value = "RegularUser"} else {rightBox.value = "Admin"}
            emailBox.value = user.email
            usernameBox.value = user.userName
            firstnameBox.value = user.firstName
            lastNameBox.value = user.lastName
            passwordBox.value = user.password
            genderBox.value = user.gender
            birthdateBox.value = user.birthDate.toString()
            profileName.innerHTML = user.firstName + " " + user.lastName
        }) 
             
    } catch (AxiosError) {
        console.log(AxiosError)
    }
}


function getQuote(): void {
    let url: string = "https://talaikis.com/api/quotes/random/";
    axios.get(url)
        .then((response: AxiosResponse) => {
            console.log(response.data);
            Quote.innerHTML = response.data.quote + "<br>" + "- " + response.data.author;
        })
}

