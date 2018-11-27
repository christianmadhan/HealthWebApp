import * as $  from "../../node_modules/jquery/dist/jquery";
// Works when compiled.
import { Chart }  from "../../node_modules/chart.js/dist/Chart.js"; 
import * as PerfectScrollbar from "../../node_modules/perfect-scrollbar/dist/perfect-scrollbar";
import axios, {
  AxiosResponse,
  AxiosError
} from "../../node_modules/axios/index";

import * as Pikaday from '../../node_modules/pikaday/pikaday';


let checkbox1: HTMLInputElement = <HTMLInputElement>document.getElementById("inlineCheckbox1");
let checkbox2: HTMLInputElement = <HTMLInputElement>document.getElementById("inlineCheckbox2");
let checkbox3: HTMLInputElement = <HTMLInputElement>document.getElementById("inlineCheckbox3");
let checkbox4: HTMLInputElement = <HTMLInputElement>document.getElementById("SortDataAscendingCheckbox");
let DateInputStart: HTMLInputElement = <HTMLInputElement>document.getElementById("datepicker1");
let DateInputEnd: HTMLInputElement = <HTMLInputElement>document.getElementById("datepicker2");
let mySort: HTMLDivElement = <HTMLDivElement>document.getElementById("SortNow");

// Your HealthData Buttons
let HeartBtn: HTMLButtonElement = <HTMLButtonElement>document.getElementById("HeartBtn");
let BloodPressureBtn: HTMLButtonElement = <HTMLButtonElement>document.getElementById("BloodPressureBtn");

// Pollutions Chart Canvas
let DustCanvas: HTMLCanvasElement = <HTMLCanvasElement>document.getElementById("pollution-chart");
let SulphurCanvas: HTMLCanvasElement = <HTMLCanvasElement>document.getElementById("pollution2-chart");
let OxidizedCanvas: HTMLCanvasElement = <HTMLCanvasElement>document.getElementById("pollution3-chart");
let FluorineCanvas: HTMLCanvasElement = <HTMLCanvasElement>document.getElementById("pollution4-chart");

let profilePic: HTMLImageElement = <HTMLImageElement>document.getElementById("ProfileAvatar");

let sidebar_mini_active : boolean = false;

let $html = $('html');

let $navbar = $('.navbar');

let LoggedInUserID:any;

// StandardLabelData
let StandardLabelData:any = [5,10,15,20,25,30,35,40,45,50,55,60,65,70,75,80,85,90,95,100];

// Initialize Arrays for Pollution Data
let DustData:any = [];
let sulphurDioxidePercentageData:any = [];
let oxidizedNitrogenCompoundPercentageData:any = [];
let fluorinePercentageData:any = [];
let mytube: IPollution[] = [];

// Initialize Labels Data
let DustLabel:any = [];
let SulphurLabel:any = [];
let OxidizedLabel:any = [];
let fluorineLabel:any = [];

// Arrays to Sort
let NewDustData:any = [];
let NewsulphurDioxidePercentageData:any = [];
let NewoxidizedNitrogenCompoundPercentageData:any = [];
let NewfluorinePercentageData:any = [];

/* 

The logic of data tables in SQL
on comment if you need it.

  interface HealthData {   
      bloodPressure: number;
      heartRate: number;
      height: number;
      id: number;
      isSmoker: number;
      latitude: number;
      longitude: number;
      userID: number;
      weight: number;  
  }


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

*/
interface IPollution {
  arbonMonoxidPercentage: number;
  dustPercentage: number;
  fluorinePercentage: number;
  id: number;
  latitude: number;
  longitude: number;
  oxidizedNitrogenCompoundPercentage: number;
  ozonePercentage: number;
  recordTime: Date;
  sulphurDioxidePercentage: number;
}


/*!

 =========================================================
 * Dashboard - v1.0.0
 =========================================================

 * Coded by Team BerthaProject

 =========================================================

 */



$(document).ready(function() {


 });


//------------------------------------------------ Chart Data --------------------------------------------------------------

// All Chart Data and functions put into one function
 $(document).ready(function() {

  // Initialize Arrays for Chart Data
  let myHeartRataData:any = [];
  let myBloodPressureData:any = [];

   // Heart rate button
  HeartBtn.addEventListener("click", function(){
    document.getElementById("line-chart").style.display = "block";
    document.getElementById("myCardDiv").style.display = "block";

    let uri = "https://berthaprojectusersapi.azurewebsites.net/api/HealthDatas/SpecificUsersHealthData/" + LoggedInUserID;
    axios.get(uri)
    .then(function(response) {
      // Works when compiled
      response.data.forEach((element:any) => {
          myHeartRataData.push(element.heartRate);
      });

    var canvasChart = document.getElementById("line-chart");
    new Chart(canvasChart, {
      type: 'line',
      data: {
        labels: [10,20,30,40,50,60,70,80,90,100,200,300,400,500],
        datasets: [{ 
            data: myHeartRataData,
            label: "HeartRate",
            borderColor: "#3e95cd",
            fill: true
          }
        ]
      },
      options: {
        title: {
          display: true,
          text: 'Your Health Data'
        }
      }
    });


    })
    .catch(function (error){ // error in GET or
       console.log(error);
    }); 
  });

  // Blood pressure button
  BloodPressureBtn.addEventListener("click", function(){
    document.getElementById("line-chart").style.display = "block";
    document.getElementById("myCardDiv").style.display = "block";

    let uri = "https://berthaprojectusersapi.azurewebsites.net/api/HealthDatas/SpecificUsersHealthData/" + LoggedInUserID;
    axios.get(uri)
    .then(function(response) {
      response.data.forEach((element:any) =>  {
          //myHeartRataData.push(element.heartRate);
          myBloodPressureData.push(parseInt(element.bloodPressure));
      });

    var canvasChart = document.getElementById("line-chart");
    new Chart(canvasChart, {
      type: 'line',
      data: {
        labels: [40,50,60,70,80,90,100],
        datasets: [{ 
            data: myBloodPressureData,
            label: "BloodPressure",
            borderColor: "#8e5ea2",
            fill: true
          }
        ]
      },
      options: {
          scales: {
            yAxes: [{
              scaleLabel: {
                display:true,
                labelString:'Systolic'
              }
            }],
            xAxes: [{
              scaleLabel: {
                display:true,
                labelString:'Diastolic'
              }
            }]
          }
      }
    });


    })
    .catch(function (error){ // error in GET or
       console.log(error);
    });      

  });
  
  // End of Buttons functions ----------------------------------------------
  
});


   // Create Arrays for Pollutions datas

$(document).ready(function(){
   
 var picker = new Pikaday({
  field: DateInputStart,
  minDate: new Date(Date.now())
});
picker.draw();

var picker = new Pikaday({
  field: DateInputEnd,
  minDate: new Date(Date.now())
});
picker.draw();

    // Initialize Api url string. Axios Will make a get method to this string.
    let uri = "https://berthaprojectusersapi.azurewebsites.net/api/Pollution";

    // Axios get method, which will put all the pollution data into the Arrays. 
      axios.get(uri)
      .then(function(response) {
        // Works when compiled
        response.data.forEach((element:any) => {
            DustData.push(parseInt(element.dustPercentage));
            NewDustData.push(parseInt(element.dustPercentage));
            DustLabel.push(parseInt(element.dustPercentage));
           // mytube.push(parseInt(element.dustPercentage));
            mytube.push(element);

            sulphurDioxidePercentageData.push(element.sulphurDioxidePercentage);
            NewsulphurDioxidePercentageData.push(element.sulphurDioxidePercentage);
            SulphurLabel.push(parseInt(element.sulphurDioxidePercentage));

            oxidizedNitrogenCompoundPercentageData.push(element.oxidizedNitrogenCompoundPercentage);
            NewoxidizedNitrogenCompoundPercentageData.push(element.oxidizedNitrogenCompoundPercentage);
            OxidizedLabel.push(parseInt(element.oxidizedNitrogenCompoundPercentage));

            fluorinePercentageData.push(element.fluorinePercentage);
            NewfluorinePercentageData.push(element.fluorinePercentage);
            fluorineLabel.push(parseInt(element.fluorinePercentage));
        })
        

   // ------------------ Pollution Charts ------------------------------------------------  
   mytube.forEach(elm => {
      console.log(elm.recordTime);
   });   
   let DustChart = new Chart(DustCanvas, {
        type: 'line',
        data: {
          labels: StandardLabelData,
          datasets: [{ 
              data: DustData,
              label: "Dust",
              borderColor: "#3e95cd",
              fill: true
            }
          ]
        },
        options: {
          title: {
            display: true,
            text: 'Dust Data'
          }
        }
      });


  let SulphurChart =  new Chart(SulphurCanvas, {
        type: 'line',
        data: {
          labels: StandardLabelData,
          datasets: [{ 
              data: sulphurDioxidePercentageData,
              label: "Sulphur Dioxide",
              borderColor: "#3e95cd",
              fill: true
            }
          ]
        },
        options: {
          title: {
            display: true,
            text: 'Sulphur Data'
          }
        }
      });

    
   let OxidizedChart = new Chart(OxidizedCanvas, {
        type: 'line',
        data: {
          labels: StandardLabelData,
          datasets: [{ 
              data: oxidizedNitrogenCompoundPercentageData,
              label: "Oxidized Nitrogen Compound",
              borderColor: "#3e95cd",
              fill: true
            }
          ]
        },
        options: {
          title: {
            display: true,
            text: 'Oxidized Nitrogen Compound Data'
          }
        }
      });
    
   let fluorineChart =  new Chart(FluorineCanvas, {
        type: 'line',
        data: {
          labels: StandardLabelData,
          datasets: [{ 
              data: fluorinePercentageData,
              label: "Fluorine",
              borderColor: "#3e95cd",
              fill: true
            }
          ]
        },
        options: {
          title: {
            display: true,
            text: 'fluorine Data'
          }
        }
      });

   DateInputEnd.addEventListener("click", function() {
      if(DateInputStart.value == ""){
        DateInputEnd.disabled = true;
        document.getElementById("DateMissing").style.display = "block";
      }
   })  
 // ------------------ End Of Pollution Charts ------------------------------------------------  



 


 var getStoredUserID = localStorage.getItem("key");
 LoggedInUserID = parseInt(getStoredUserID);
 profilePic.src = "assets/img/avatar" + LoggedInUserID + ".jpg";

 checkbox1.addEventListener("change", function(){
  if(this.checked) {


    //NewDustData.sort(function(a:any,b:any){return a - b});
    //DustLabel.sort(function(a:any,b:any){return a - b});

    //NewoxidizedNitrogenCompoundPercentageData.sort(function(a:any,b:any){return a - b});
   // OxidizedLabel.sort(function(a:any,b:any){return a - b});
    
    //NewsulphurDioxidePercentageData.sort(function(a:any,b:any){return a - b});
    //SulphurLabel.sort(function(a:any,b:any){return a - b});

    //NewfluorinePercentageData.sort(function(a:any,b:any){return a - b});
    //fluorineLabel.sort(function(a:any,b:any){return a - b});
  //  DustData.sort(function(a:any,b:any){return a - b});
  //  sulphurDioxidePercentageData.sort(function(a:any,b:any){return a - b});
  //  oxidizedNitrogenCompoundPercentageData.sort(function(a:any,b:any){return a - b});
  //  fluorinePercentageData.sort(function(a:any,b:any){return a - b});
   addData(DustChart,DustLabel,NewDustData);
   addData(OxidizedChart,OxidizedLabel,NewoxidizedNitrogenCompoundPercentageData);
   addData(SulphurChart,SulphurLabel,NewsulphurDioxidePercentageData);
   addData(fluorineChart,fluorineLabel,NewfluorinePercentageData);


    checkbox2.disabled = true;
    checkbox3.disabled = true;
    mySort.style.display = 'block'; 


} else {
  addData(DustChart,StandardLabelData,DustData);
  addData(OxidizedChart,StandardLabelData,oxidizedNitrogenCompoundPercentageData);
  addData(SulphurChart,StandardLabelData,sulphurDioxidePercentageData);
  addData(fluorineChart,StandardLabelData,fluorinePercentageData);

  checkbox2.disabled = false;
  checkbox3.disabled = false;
  mySort.style.display = 'none'; 
}
 });

// Checkbox 2
 checkbox2.addEventListener("change", function(){
  if(this.checked) {
    checkbox1.disabled = true;
    checkbox3.disabled = true;
} else {
  
  checkbox1.disabled = false;
  checkbox3.disabled = false;
}
 });

 // Checkbox 3
checkbox3.addEventListener("change", function(){
  if(this.checked) {
    checkbox2.disabled = true;
    checkbox1.disabled = true;
} else {
  
  checkbox2.disabled = false;
  checkbox1.disabled = false;
}
 });

 checkbox4.addEventListener("change", function(){
  if(DustLabel[0] == 1){
    checkbox4.checked = true;
  } else if(this.checked) {
    DustLabel.sort(function(a:any,b:any){return a - b});
    addData(DustChart,DustLabel,NewDustData);

    OxidizedLabel.sort(function(a:any,b:any){return a - b});
    addData(OxidizedChart,OxidizedLabel,NewoxidizedNitrogenCompoundPercentageData);
  
    SulphurLabel.sort(function(a:any,b:any){return a - b});
    addData(SulphurChart,SulphurLabel,NewsulphurDioxidePercentageData);
 
    fluorineLabel.sort(function(a:any,b:any){return a - b});
    addData(fluorineChart,fluorineLabel,NewfluorinePercentageData); 
  }

 });


 
 //-----------------------End of Eventlistener --------------------------
 function addData(Chart:any, label:any, data:any) {
  Chart.data.labels = label;
 //  Chart.data.labels.push(label);

  Chart.data.datasets.forEach((dataset:any) => {
      dataset.data.push(data);
  });
  Chart.update();
}

});
 


//------------------------------------- End of Chart Data -----------------------------------------------


(function() {
  var isWindows = navigator.platform.indexOf('Win') > -1 ? true : false;

  if (isWindows) {
    // if we are on windows OS we activate the perfectScrollbar function
    if ($('.main-panel').length != 0) {
      var ps = new PerfectScrollbar('.main-panel', {
        wheelSpeed: 2,
        wheelPropagation: true,
        minScrollbarLength: 20,
        suppressScrollX: true
      });
    }

    if ($('.sidebar .sidebar-wrapper').length != 0) {

      var ps1 = new PerfectScrollbar('.sidebar .sidebar-wrapper');
      $('.table-responsive').each(function() {
        var ps2 = new PerfectScrollbar($(this)[0]);
      });
    }



    $html.addClass('perfect-scrollbar-on');
  } else {
    $html.addClass('perfect-scrollbar-off');
  }
})();

$(document).ready(function() {

  var scroll_start = 0;
  var startchange = $('.row');
  var offset = startchange.offset();
  var scrollElement = navigator.platform.indexOf('Win') > -1 ? $(".ps") : $(window);
  scrollElement.scroll(function() {

    scroll_start = $(this).scrollTop();

    if (scroll_start > 50) {
      $(".navbar-minimize-fixed").css('opacity', '1');
    } else {
      $(".navbar-minimize-fixed").css('opacity', '0');
    }
  });


  $(document).scroll(function() {
    scroll_start = $(this).scrollTop();
    if (scroll_start > offset.top) {
      $(".navbar-minimize-fixed").css('opacity', '1');
    } else {
      $(".navbar-minimize-fixed").css('opacity', '0');
    }
  });

  if ($('.full-screen-map').length == 0 && $('.bd-docs').length == 0) {
    // On click navbar-collapse the menu will be white not transparent
    $('.collapse').on('show.bs.collapse', function() {
      $(this).closest('.navbar').removeClass('navbar-transparent').addClass('bg-white');
    }).on('hide.bs.collapse', function() {
      $(this).closest('.navbar').addClass('navbar-transparent').removeClass('bg-white');
    });
  }

  blackDashboard.initMinimizeSidebar();

  $navbar = $('.navbar[color-on-scroll]');
});

$(document).on('click', '.navbar-toggle', function() {
  var $toggle = $(this);

  if (blackDashboard.misc.navbar_menu_visible == 1) {
    $html.removeClass('nav-open');
    blackDashboard.misc.navbar_menu_visible = 0;
    setTimeout(function() {
      $toggle.removeClass('toggled');
      $('.bodyClick').remove();
    }, 550);

  } else {
    setTimeout(function() {
      $toggle.addClass('toggled');
    }, 580);

    var div = '<div class="bodyClick"></div>';
    $(div).appendTo('body').click(function() {
      $html.removeClass('nav-open');
      blackDashboard.misc.navbar_menu_visible = 0;
      setTimeout(function() {
        $toggle.removeClass('toggled');
        $('.bodyClick').remove();
      }, 550);
    });

    $html.addClass('nav-open');
    blackDashboard.misc.navbar_menu_visible = 1;
  }
});

let blackDashboard = {
  misc: {
    navbar_menu_visible: 0
  },

  initMinimizeSidebar: function() {
    if ($('.sidebar-mini').length != 0) {
      sidebar_mini_active = true;
    }

    $('#minimizeSidebar').click(function() {
      var $btn = $(this);

      if (sidebar_mini_active == true) {
        $('body').removeClass('sidebar-mini');
        sidebar_mini_active = false;
      } else {
        $('body').addClass('sidebar-mini');
        sidebar_mini_active = true;
      }

      // we simulate the window Resize so the charts will get updated in realtime.
      var simulateWindowResize = setInterval(function() {
        window.dispatchEvent(new Event('resize'));
      }, 180);

      // we stop the simulation of Window Resize after the animations are completed
      setTimeout(function() {
        clearInterval(simulateWindowResize);
      }, 1000);
    });
  }}
},

function hexToRGB(hex:any, alpha:any) {
  var r = parseInt(hex.slice(1, 3), 16),
    g = parseInt(hex.slice(3, 5), 16),
    b = parseInt(hex.slice(5, 7), 16);

  if (alpha) {
    return "rgba(" + r + ", " + g + ", " + b + ", " + alpha + ")";
  } else {
    return "rgb(" + r + ", " + g + ", " + b + ")";
  }
});




