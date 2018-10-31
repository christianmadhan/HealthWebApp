import axios, {
    AxiosResponse,
    AxiosError
}
    from "../../node_modules/axios/index";

    let list: Array<IPerson> = [];

interface IPerson {
    isAdmin: number;
    username: string;
    personPassword: string;
    FirstName: string;
    LastName: string;
    Gender: string;
    BirthDate: Date;
}


let UserName: HTMLInputElement = <HTMLInputElement>document.getElementById("inputUsername");
let PassWord: HTMLInputElement = <HTMLInputElement>document.getElementById("inputPassword");
let LogInBtn: HTMLButtonElement = <HTMLButtonElement>document.getElementById("LogInBtn");


window.onload = () => {

    let uri: string = "https://healthdataberthaprojec.azurewebsites.net/api/Person";
    axios.get<IPerson[]>(uri)
        .then(function (response: AxiosResponse<IPerson[]>): void {
            response.data.forEach((user: IPerson) => {
                if( user != null){
                    list.push(user);
                }
            })
            console.log(list);
        })
        .catch(function (error: AxiosError) {
            console.log(error);
        });
}


function Login(): void {
    let inputUserName: string = UserName.value;
    let inputPassword: string = PassWord.value;
    let Attempt: boolean;
    let AdminAttempt: boolean;
    list.forEach(element => {
        if(inputUserName == element.username && inputPassword == element.personPassword){
            Attempt = true;
            if(element.isAdmin == 1){
                AdminAttempt = true;
            }           
        }

    });

    console.log(Attempt);
    if(Attempt == true && AdminAttempt == true){
        window.location.href = "HealthAdmin.htm";
    } else if(Attempt == true ) {
        window.location.href = "HealthUser.htm";
    } else{
        alert("Wrong Username or password");
    }
}

 LogInBtn.addEventListener("click", Login);

