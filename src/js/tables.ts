import axios, {
    AxiosResponse,
    AxiosError
} from "../../node_modules/axios";

interface IHealthData {
    id: number;
    weight: number;
    height: number;
    issmoker: number;
    bloodpressure: string;
    heartrate: number;
    userid: number;
    latitude: number;
    longitude: number;
}

/* GET ALL HEALTHDATA */

let getdatabtn: HTMLButtonElement = <HTMLButtonElement>document.getElementById("getdatabutton");
getdatabtn.addEventListener("click", doGetAll);

let localuserid: number = parseInt(localStorage.getItem("key"));
console.log("local user ID: " + localuserid);

function doGetAll(): void {
    let uri: string = "https://berthaprojectusersapi.azurewebsites.net/api/HealthDatas/";

    axios.get<IHealthData[]>(uri)
        .then(function (response: AxiosResponse<IHealthData[]>): void {
            console.log(response.data);
            let result: string = "";

            response.data.forEach((hd: IHealthData) => {
                result += "<tr><td>" + hd.id + "</td><td>" + hd.weight + " kg</td><td>" + hd.height + " cm</td><td>" + hd.issmoker + "</td><td>" + hd.bloodpressure + " mmHg</td><td>" + hd.heartrate + " bpm</td><td>" + hd.latitude + "</td><td>" + hd.longitude + "</td></tr>";
            });
            console.log(result);

            let tablecontent: HTMLTableElement = <HTMLTableElement>document.getElementById("simpletablecontent");
            tablecontent.innerHTML = result;
        })
        .catch(function (error: AxiosError): void {
            console.log(error);
        })
}