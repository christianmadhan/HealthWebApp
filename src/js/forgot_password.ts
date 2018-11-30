import axios, {
    AxiosResponse,
    AxiosError
} from "../../node_modules/axios/index";

import * as $  from "../../node_modules/jquery/dist/jquery";



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





window.onload = function () {
    UserTxt.value = "";
    EmailTxt.value = "";
};

let UserTxt: HTMLInputElement = <HTMLInputElement>document.getElementById("name");
let EmailTxt: HTMLInputElement = <HTMLInputElement>document.getElementById("email");
let ForgotBtn: HTMLButtonElement = <HTMLButtonElement>document.getElementById("forgotButton");

ForgotBtn.addEventListener("click", SendForgot);

interface IOneUser {
    userName: string;
    password: string;
    email: string;
}



function SendForgot(): void {

    try {
        let uri: string = "https://berthaprojectusersapi.azurewebsites.net/api/Users";
        let inputUserName: string = UserTxt.value;
        let inputEmail: string = EmailTxt.value;

        axios.get<IOneUser[]>(uri)
        .then(function (response: AxiosResponse<IOneUser[]>): void {
            console.log(response.data);

            response.data.forEach((user: IOneUser) => {
                if (inputUserName === user.userName && inputEmail === user.email){
                    console.log("SUCCESS! " + user.userName + " " + user.email);
                    window.alert("Password reminder has been sent.\nPlease, check your inbox!");
                    SendEmail();
                }
                else{
                    DisplayWrongUsernameOrPassword();
                }
            });
        })
        .catch(function (error: AxiosError): void {
            DisplayWrongUsernameOrPassword();
            console.log(error);
        })
    } catch (error) {

    }

}


function DisplayWrongUsernameOrPassword() {
    var x = document.getElementById("wrong");
    if (x.style.display === "none") {
        x.style.display = "block";
        document.getElementById("checkNot").className = 'fas fa-skull-crossbones';
    } else {
        x.style.display = "none";
    }
}


function SendEmail(): void{
    
}