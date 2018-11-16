import axios, {
    AxiosResponse,
    AxiosError
} from "../../node_modules/axios/index";

import * as $  from "../../node_modules/jquery/dist/jquery";


let UserID: number;


interface IPerson {
    id: number;
    isAdmin: number;
    username: string;
    personPassword: string;
    FirstName: string;
    LastName: string;
    Gender: string;
    BirthDate: Date;
}



$(function () {

    $(".input input").focus(function () {

        $(this).parent(".input").each(function () {
            $("label").css({
                "line-height": "18px",
                "font-size": "18px",
                "font-weight": "100",
                "top": "0px"
            })
            $(".spin").css({
                "width": "100%"
            })
        });
    }).blur(function () {
        $(".spin").css({
            "width": "0px"
        })
        if ($(this).val() == "") {
            $(this).parent(".input").each(function () {
                $("label").css({
                    "line-height": "60px",
                    "font-size": "24px",
                    "font-weight": "300",
                    "top": "10px"
                })
            });

        }
    });

    $(".button").click(function (e:any) {
        var pX = e.pageX,
            pY = e.pageY,
            oX = parseInt($(this).offset().left),
            oY = parseInt($(this).offset().top);

        $(this).append('<span class="click-efect x-' + oX + ' y-' + oY + '" style="margin-left:' + (pX - oX) + 'px;margin-top:' + (pY - oY) + 'px;"></span>')
        $('.x-' + oX + '.y-' + oY + '').animate({
            "width": "500px",
            "height": "500px",
            "top": "-250px",
            "left": "-250px",

        }, 600);
        $("button").addClass('active');

    })

    $(".alt-2").click(function () {
        if (!$(this).hasClass('material-button')) {
            $(".shape").css({
                "width": "100%",
                "height": "100%",
                "transform": "rotate(0deg)"
            })

            setTimeout(function () {
                $(".overbox").css({
                    "overflow": "initial"
                })
            }, 600)

            $(this).animate({
                "width": "140px",
                "height": "140px"
            }, 500, function () {
                $(".box").removeClass("back");

                $(this).removeClass('active')
            });

            $(".overbox .title").fadeOut(300);
            $(".overbox .input").fadeOut(300);
            $(".overbox .button").fadeOut(300);

            $(".alt-2").addClass('material-buton');

        }

    })

    $(".material-button").click(function () {

        if ($(this).hasClass('material-button')) {
            setTimeout(function () {
                $(".overbox").css({
                    "overflow": "hidden"
                })
                $(".box").addClass("back");
            }, 200)
            $(this).addClass('active').animate({
                "width": "700px",
                "height": "700px"
            });

            setTimeout(function () {
                $(".shape").css({
                    "width": "50%",
                    "height": "50%",
                    "transform": "rotate(45deg)"
                })

                $(".overbox .title").fadeIn(300);
                $(".overbox .input").fadeIn(300);
                $(".overbox .button").fadeIn(300);
            }, 700)

            $(this).removeClass('material-button');

        }

        if ($(".alt-2").hasClass('material-buton')) {
            $(".alt-2").removeClass('material-buton');
            $(".alt-2").addClass('material-button');
        }



    });

});


let UserName: HTMLInputElement = <HTMLInputElement>document.getElementById("name");
let PassWord: HTMLInputElement = <HTMLInputElement>document.getElementById("pass");
let LogInBtn: HTMLButtonElement = <HTMLButtonElement>document.getElementById("loginBtn");

window.onload = function () {
    UserName.value = "";
    PassWord.value = "";
};



/*
    In the login function we just need to evaluated the status code
    which the getJSOnAsync function returns (Look at the button for doc.). The method returns
    a status code an a object. First we check for the status code to check if it's 200.
    if that's the case, then we want to know which user is logged in. We save the id of the 
    user which is logged in, in a variable and then store that variable in the local storage.
    the local storage behave the same way as a cookie. After we have storage the data, we
    redirect the user to the dashboard page.

*/
function Login(): void {

    getJSONAsync().then(result => {
        if (result.status == 200) {
            UserID =  result.data.id;
            localStorage.setItem("key", UserID.toString());
            window.location.href = "dashboard.html";
        }
    }).catch(error => {
        DisplayWrongUsernameOrPassword();
        console.log(error);
        
    });



}

/*
    If the user input was wrong we want to show
    that the login attemt was failed.
    so we change the icon on the button to a skull
    and then show some text which is hidden in the html as default.
*/
function DisplayWrongUsernameOrPassword() {
    var x = document.getElementById("wrong");
    if (x.style.display === "none") {
        x.style.display = "block";
        document.getElementById("checkNot").className = 'fas fa-skull-crossbones';
    } else {
        x.style.display = "none";
    }
}

LogInBtn.addEventListener("click", Login);

// Async/Await approach
// The async keyword will automatically create a new Promise and return it.
/* 
    This method post the data, that the user has typed in the username and password fields.
    It post it to a web api, in a controller authenticate the data. In the controller, we
    made a foreach loop going through each user object and test if the data is valid.
    if both username and password is valid, it will respon with a status code of 200
    and the user object, where the password is set to null.
*/
async function getJSONAsync() {

    try {
        let uri: string = "https://berthaprojectusersapi.azurewebsites.net/api/Authentication";
        let inputUserName: string = UserName.value;
        let inputPassword: string = PassWord.value;
        let Attempt: boolean;
        let AdminAttempt: boolean;

        // The await keyword saves us from having to write a .then() block.
        let json = await axios.post(uri, {
            username: inputUserName,
            password: inputPassword
        });
    
        return json;
    } catch (error) {

    }

}