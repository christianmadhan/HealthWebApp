import axios, {
    AxiosResponse,
    AxiosError
} from "../../node_modules/axios/index";

let loggedInUserId = parseInt(localStorage.getItem("key"))
console.log(loggedInUserId)

let rightBox : HTMLInputElement = <HTMLInputElement> document.getElementById("rightBox")
let emailBox : HTMLInputElement = <HTMLInputElement> document.getElementById("emailBox")
let usernameBox : HTMLInputElement = <HTMLInputElement> document.getElementById("usernameBox")
let firstnameBox : HTMLInputElement = <HTMLInputElement> document.getElementById("firstNameBox")
let lastNameBox : HTMLInputElement = <HTMLInputElement> document.getElementById("lastNameBox")
let passwordBox : HTMLInputElement = <HTMLInputElement> document.getElementById("passwordBox")
let genderBox : HTMLInputElement = <HTMLInputElement> document.getElementById("genderBox")
let birthdateBox : HTMLInputElement = <HTMLInputElement> document.getElementById("birthDateBox")

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

window.onload = function () {
    loadUserData();
};

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
        }) 
             
    } catch (AxiosError) {
        console.log(AxiosError)
    }
}

