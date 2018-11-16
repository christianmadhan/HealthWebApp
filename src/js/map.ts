import * as $  from "../../node_modules/jquery/dist/jquery";
let profilePic: HTMLImageElement = <HTMLImageElement>document.getElementById("ProfileAvatar");

$(document).ready(function() {
    let getStoredUserID = localStorage.getItem("key");
    let LoggedInUserID = parseInt(getStoredUserID);
     profilePic.src = "assets/img/avatar" + LoggedInUserID + ".jpg";
   });
  
