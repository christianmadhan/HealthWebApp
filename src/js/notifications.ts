import * as $  from "../../node_modules/jquery/dist/jquery";
import * as Pikaday from '../../node_modules/pikaday/pikaday';


let profilePic: HTMLImageElement = <HTMLImageElement>document.getElementById("ProfileAvatar");

$(document).ready(function() {
    let getStoredUserID = localStorage.getItem("key");
    let LoggedInUserID = parseInt(getStoredUserID);
     profilePic.src = "assets/img/avatar" + LoggedInUserID + ".jpg";

     

  var picker = new Pikaday({
    field: document.getElementById('datepicker1'),
    minDate: new Date(Date.now())
  });
  picker.draw();

  var picker = new Pikaday({
    field: document.getElementById('datepicker2'),
    minDate: new Date(Date.now())
  });
  picker.draw();

  });

