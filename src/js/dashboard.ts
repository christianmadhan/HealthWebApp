import * as $  from "../../node_modules/jquery/dist/jquery";
 import {Chart}  from "../../node_modules/chart.js/dist/Chart.js"; 
import * as PerfectScrollbar from "../../node_modules/perfect-scrollbar/dist/perfect-scrollbar";
import axios, {
  AxiosResponse,
  AxiosError
} from "../../node_modules/axios/index";


let transparent : boolean = true;
let transparentDemo : boolean = true;
let fixedTop : boolean = false;

let navbar_initialized : boolean = false;
let backgroundOrange : boolean = false;
let sidebar_mini_active : boolean = false;
let toggle_initialized : boolean = false;

let $html = $('html');
let $body = $('body');
let $navbar_minimize_fixed = $('.navbar-minimize-fixed');
let $collapse = $('.collapse');
let $navbar = $('.navbar');
let $tagsinput = $('.tagsinput');
let $selectpicker = $('.selectpicker');
let $navbar_color = $('.navbar[color-on-scroll]');
let $full_screen_map = $('.full-screen-map');
let $datetimepicker = $('.datetimepicker');
let $datepicker = $('.datepicker');
let $timepicker = $('.timepicker');
let LoggedInUserID:any;

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



/*!

 =========================================================
 * Dashboard - v1.0.0
 =========================================================

 * Coded by Team BerthaProject

 =========================================================

 */




$(document).ready(function() {
  var getStoredUserID = localStorage.getItem("key");
   LoggedInUserID = parseInt(getStoredUserID);
 });


// Show HeartRate Chart
 $(document).ready(function() {
    $("#HeartBtn").click(function(){
      document.getElementById("line-chart").style.display = "block";
      document.getElementById("myCardDiv").style.display = "block";
      let myHeartRataData:any = [];

      let uri = "https://berthaprojectusersapi.azurewebsites.net/api/HealthDatas/SpecificUsersHealthData/" + LoggedInUserID;
      axios.get(uri)
      .then(function(response) {
        response.data.forEach(element => {
            myHeartRataData.push(element.heartRate);
            //myBloodPressureData.push(parseInt(element.bloodPressure));
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
});




$(document).ready(function() {
    $("#BloodPressureBtn").click(function(){
      document.getElementById("line-chart").style.display = "block";
      document.getElementById("myCardDiv").style.display = "block";
      let myBloodPressureData:any = [];

      let uri = "https://berthaprojectusersapi.azurewebsites.net/api/HealthDatas/SpecificUsersHealthData/" + LoggedInUserID;
      axios.get(uri)
      .then(function(response) {
        response.data.forEach(element =>  {
            //myHeartRataData.push(element.heartRate);
            myBloodPressureData.push(parseInt(element.bloodPressure));
        });

      var canvasChart = document.getElementById("line-chart");
      new Chart(canvasChart, {
        type: 'line',
        data: {
          labels: [10,20,30,40,50,60,70,80,90,100,200,300,400,500],
          datasets: [{ 
              data: myBloodPressureData,
              label: "BloodPressure",
              borderColor: "#8e5ea2",
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
});


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
  /* 
  // If something with scrolling isn't working: oncomment this code to check if it helps.
    let scroll_distance = $navbar.attr('color-on-scroll') || 500;

  // Check if we have the class "navbar-color-on-scroll" then add the function to remove the class "navbar-transparent" so it will transform to a plain color.
  if ($('.navbar[color-on-scroll]').length != 0) {
    blackDashboard.checkScrollForTransparentNavbar();
    $(window).on('scroll', blackDashboard.checkScrollForTransparentNavbar)
  }

  $('.form-control').on("focus", function() {
    $(this).parent('.input-group').addClass("input-group-focus");
  }).on("blur", function() {
    $(this).parent(".input-group").removeClass("input-group-focus");
  });

  // Activate bootstrapSwitch
  $('.bootstrap-switch').each(function() {
   let $this = $(this);
   let data_on_label = $this.data('on-label') || '';
   let data_off_label = $this.data('off-label') || '';

    $this.bootstrapSwitch({
      onText: data_on_label,
      offText: data_off_label
    });
  });
  
  
    End of comment 
  */
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

$(window).resize(function() {
  // reset the seq for charts drawing animations
  seq = seq2 = 0;

  if ($full_screen_map.length == 0 && $('.bd-docs').length == 0) {
    var isExpanded = $navbar.find('[data-toggle="collapse"]').attr("aria-expanded");
    if ($navbar.hasClass('bg-white') && $(window).width() > 991) {
      $navbar.removeClass('bg-white').addClass('navbar-transparent');
    } else if ($navbar.hasClass('navbar-transparent') && $(window).width() < 991 && isExpanded != "false") {
      $navbar.addClass('bg-white').removeClass('navbar-transparent');
    }
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
  },

  /* 
    // Not sure if we need this code
    showSidebarMessage: function(message: any) {
    try {
      $.notify({
        icon: "tim-icons ui-1_bell-53",
        message: message
      }, {
        type: 'info',
        timer: 4000,
        placement: {
          from: 'top',
          align: 'right'
        }
      });
    } catch (e) {
      console.log('Notify library is missing, please make sure you have the notifications library added.');
    }

  }
  
  
  */

};

function hexToRGB(hex:any, alpha:any) {
  var r = parseInt(hex.slice(1, 3), 16),
    g = parseInt(hex.slice(3, 5), 16),
    b = parseInt(hex.slice(5, 7), 16);

  if (alpha) {
    return "rgba(" + r + ", " + g + ", " + b + ", " + alpha + ")";
  } else {
    return "rgb(" + r + ", " + g + ", " + b + ")";
  }
}

