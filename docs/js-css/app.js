document.onreadystatechange = function () {
  var state = document.readyState;
  if (state == 'complete') {
      setTimeout(function(){
        // $("#loading").addClass("hidden");
        document.getElementById("body_").removeAttribute("hidden");

      },1000);
  }
};1

// Initialize Firebase
var config = {
  apiKey: "AIzaSyCoIqGCI50XP5o4D98_stDiwUeO2QfPe-U",
  authDomain: "mareografo-arduino.firebaseapp.com",
  databaseURL: "https://mareografo-arduino.firebaseio.com",
  projectId: "mareografo-arduino"
};

firebase.initializeApp(config);
var ctx_temp = document.getElementById("temp");
var chartTemp;

var ctx_dist = document.getElementById("dist");
var chartDist;

var ctx_hum = document.getElementById("hum");
var chartHum;

var loading1 = document.getElementById("loading1");
var loading2 = document.getElementById("loading2");
var loading3 = document.getElementById("loading3");


var dist_time = [];
var dist_values = [];
var distance_array = [];


var hum_time = [];
var hum_values = [];
var hum_array = []

var temp_time = [];
var temp_values = [];
var temp_array = []


loading1.classList.remove("hidden");
loading2.classList.remove("hidden");
loading3.classList.remove("hidden");


var ref = firebase.database().ref("/");

var passwordInput = document.getElementById('passInput');
var emailInput = document.getElementById('emailInput');
var loginBtn = document.getElementById('login');

var loginform = document.getElementById('loginform');
var hellothere = document.getElementById('hellothere');

var temptab = document.getElementById('temptab');
var humtab = document.getElementById('humtab');
var disttab = document.getElementById('disttab');
var hometab = document.getElementById('hometab');
var loctab = document.getElementById('loctab');


// to know if it's morning or afternoon or evening.
function getGreetingTime (m) {
	var g = null; //return g

	if(!m || !m.isValid()) { return; } //if we can't find a valid or filled moment, we return.

	var split_afternoon = 12 //24hr time to split the afternoon
	var split_evening = 17 //24hr time to split the evening
	var currentHour = parseFloat(m.format("HH"));

	if(currentHour >= split_afternoon && currentHour <= split_evening) {
		g = "Boa tarde";
	} else if(currentHour >= split_evening) {
		g = "Boa noite";
	} else {
		g = "Bom dia";
	}

	return g;
}
document.getElementById('greetings').innerHTML="<strong><i>" + getGreetingTime(moment()) + ",</i><strong>"



// On ENTER (keycode 13) Press while on PasswordInput simulate a click on the Autenticar Button.
$('#passInput').keypress(function(e){
       if(e.keyCode==13)
       $('#login').click();
});

if(Cookies.get('signedin') == "yes"){
  // Warn the user that he's authenticated by
 loginform.classList.add('hidden');
 hellothere.removeAttribute("hidden", "");

 hometab.innerHTML="Home";
 humtab.removeAttribute("hidden", "");
 disttab.removeAttribute("hidden", "");
 temptab.removeAttribute("hidden", "");

}

var vDist = document.getElementById('verDist');
var vHum = document.getElementById('verHum');
var vTemp = document.getElementById('verTemp');

 /////////////////////////////////////////////////////////
 //date picker jquery_ui
 $(function(){
   $("#datepickerTemp").datepicker({
     minDate: new Date(2018, 01, 01),
     maxDate: new Date(2018, 01, 28),
     dateFormat: "dd M yy",
     showAnim: "slideDown",
     onSelect: function (date){
       vTemp.removeAttribute("disabled", "");
       document.getElementById('getpdf_temp').setAttribute("disabled", "");
     }
   });

   $("#datepickerHum").datepicker({
     minDate: new Date(2018, 01, 01),
     maxDate: new Date(2018, 01, 28),
     dateFormat: "dd M yy",
     showAnim: "slideDown",
     onSelect: function (date){
       vHum.removeAttribute("disabled", "");
       document.getElementById('getpdf_hum').setAttribute("disabled", "");
     }
   });

   $("#datepickerDist").datepicker({
     minDate: new Date(2018, 01, 01),
     maxDate: new Date(2018, 01, 28),
     dateFormat: "dd M yy",
     showAnim: "slideDown",
     onSelect: function (date){
       vDist.removeAttribute("disabled", "");
       document.getElementById('getpdf_dist').setAttribute("disabled", "");
     }
   });
 });
 /////////////////////////////////////////////////////////


 /////////////////////////////////////////////////////////

 var dpDist = document.getElementById('datepickerDist');
 var dpTemp = document.getElementById('datepickerTemp');
 var dpHum = document.getElementById('datepickerHum');
 var isit = false;

 var dayX;
 var monthX;
 var yearX;



 $("#verTemp").click(function() {
   dayX = dpTemp.value.split(" ")[0];
   monthX = dpTemp.value.split(" ")[1];
   yearX = dpTemp.value.split(" ")[2];

   loading1.classList.remove("hidden");
   ctx_temp.classList.add("hidden");
   document.getElementById('getpdf_temp').setAttribute("disabled", "");
   document.getElementById('spinnerloading1').removeAttribute("hidden", "");
   document.getElementById('loading1title').innerHTML="<strong>Procurando dados...<strong>";
   document.getElementById('loading1sub').innerHTML="<i>conectando com o servidor<i>";

   ref.once("value").then(function(snapshot) {
      snapshot.forEach(function(childSnapshot) {
        var childData = childSnapshot.val();

        var specific_date_object = childData[yearX][monthX][dayX];
        console.log(specific_date_object);

        if (specific_date_object == null) {
          document.getElementById('spinnerloading1').setAttribute("hidden", "");
          document.getElementById('loading1title').innerHTML="<strong>Oops,<strong>";
          document.getElementById('loading1sub').innerHTML="<i>Não foi econtrado nenhum dado registado no dia " + dpTemp.value +".<i>";

        } else {
          document.getElementById('getpdf_temp').removeAttribute("disabled", "");

          temp_array = [];
          var temperature_object = specific_date_object['Temperature'];
          temp_array = Object.keys(temperature_object).map(function(key) {
            return [String(key), temperature_object[key]];
          });
          console.log(temp_array);

          // itterate through distance_array
          // first clear dist_time
          temp_time = [];
          temp_values = [];

          // if(chartTemp != null){
          //   chartTemp.destroy();
          // }

          for(var h in temp_array){
            temp_time.push(temp_array[h][0]); // use 0 to get time, use 1 to get value
            temp_values.push(temp_array[h][1]); // use 0 to get time, use 1 to get value
          };


          var options = {
            legend: { display: true },
            title: {
              display: true,
              text: 'ARDUINO DATA'
            },
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero:true
                    }
                }]
            }
          }

          chartTemp = new Chart(ctx_temp, {
              type: 'bar',
              data: {
                labels: temp_time,
                datasets: [{
                  label: "Temperatura (ºC)",
                  data: temp_values,
                  borderColor: "rgb(247, 106, 123)",
                  borderWidth: 2
                }]
              },
              options: options
          });

          loading1.classList.add("hidden");
          ctx_temp.classList.remove("hidden");
        }
      });
    });
 });

 $("#verHum").click(function() {
   dayX = dpHum.value.split(" ")[0];
   monthX = dpHum.value.split(" ")[1];
   yearX = dpHum.value.split(" ")[2];

   loading2.classList.remove("hidden");
   document.getElementById('getpdf_hum').setAttribute("disabled", "");
   ctx_hum.classList.add("hidden");
   document.getElementById('spinnerloading2').removeAttribute("hidden", "");
   document.getElementById('loading2title').innerHTML="<strong>Procurando dados...<strong>";
   document.getElementById('loading2sub').innerHTML="<i>conectando com o servidor<i>";

   ref.once("value").then(function(snapshot) {
      snapshot.forEach(function(childSnapshot) {
        var childData = childSnapshot.val();

        var specific_date_object = childData[yearX][monthX][dayX];
        console.log(specific_date_object);

        if (specific_date_object == null) {
          document.getElementById('spinnerloading2').setAttribute("hidden", "");
          document.getElementById('loading2title').innerHTML="<strong>Oops,<strong>";
          document.getElementById('loading2sub').innerHTML="<i>Não foi econtrado nenhum dado registado no dia " + dpHum.value +".<i>";

        } else {
          document.getElementById('getpdf_hum').removeAttribute("disabled", "");

          hum_array = [];
          var humidity_object = specific_date_object['Humidity'];
          hum_array = Object.keys(humidity_object).map(function(key) {
            return [String(key), humidity_object[key]];
          });
          console.log(hum_array);

          // itterate through distance_array
          // first clear dist_time
          hum_time = [];
          hum_values = [];

          if(chartHum != null){
            chartHum.destroy();
          }

          for(var h in hum_array){
            hum_time.push(hum_array[h][0]); // use 0 to get time, use 1 to get value
            hum_values.push(hum_array[h][1]); // use 0 to get time, use 1 to get value
          };


          var options = {
            legend: { display: true },
            title: {
              display: true,
              text: 'ARDUINO DATA'
            },
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero:true
                    }
                }]
            }
          }

          chartHum = new Chart(ctx_hum, {
              type: 'bar',
              data: {
                labels: hum_time,
                datasets: [{
                  label: "Humidade Relativa (%)",
                  data: hum_values,
                  borderColor: "rgb(255, 250, 133)",
                  borderWidth: 2
                }]
              },
              options: options
          });

          loading2.classList.add("hidden");
          ctx_hum.classList.remove("hidden");
        }
      });
    });
 });

 $("#verDist").click(function() {
   dayX = dpDist.value.split(" ")[0];
   monthX = dpDist.value.split(" ")[1];
   yearX = dpDist.value.split(" ")[2];

   loading3.classList.remove("hidden");
   document.getElementById('getpdf_dist').setAttribute("disabled", "");
   ctx_dist.classList.add("hidden");
   document.getElementById('spinnerloading3').removeAttribute("hidden", "");
   document.getElementById('loading3title').innerHTML="<strong>Procurando dados...<strong>";
   document.getElementById('loading3sub').innerHTML="<i>conectando com o servidor<i>";

   ref.once("value").then(function(snapshot) {
      snapshot.forEach(function(childSnapshot) {
        var childData = childSnapshot.val();

        var specific_date_object = childData[yearX][monthX][dayX];

        if (specific_date_object == null) {
          document.getElementById('spinnerloading3').setAttribute("hidden", "");
          document.getElementById('loading3title').innerHTML="<strong>Oops,<strong>";
          document.getElementById('loading3sub').innerHTML="<i>Não foi econtrado nenhum dado registado no dia " + dpDist.value +".<i>";

        } else {

          document.getElementById('getpdf_dist').removeAttribute("disabled", "");

          distance_array = [];
          var distance_object = specific_date_object['Distance'];
          distance_array = Object.keys(distance_object).map(function(key) {
            return [String(key), distance_object[key]];
          });
          console.log(distance_array);

          // itterate through distance_array
          // first clear dist_time
          dist_time = [];
          dist_values = [];

          if(chartDist != null){
            chartDist.destroy();
          }

          for(var d in distance_array){
            dist_time.push(distance_array[d][0]); // use 0 to get time, use 1 to get value
            dist_values.push(distance_array[d][1]); // use 0 to get time, use 1 to get value
          };


          var options = {
            legend: { display: true },
            title: {
              display: true,
              text: 'Arduino'
            },
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero:true
                    }
                }]
            },
            layout: {
              padding: {
                  left: 5,
                  right: 4,
                  top: 5,
                  bottom: 4
                }
              }
          }

          chartDist = new Chart(ctx_dist, {
              type: 'line',
              data: {
                labels: dist_time,
                datasets: [{
                  label: "Distância (cm)",
                  data: dist_values,
                  borderColor: "rgb(106, 159, 247)",
                  pointBackgroundColor: "rgb(0, 0, 0)"
                }]
              },
              options: options
          });

          loading3.classList.add("hidden");
          ctx_dist.classList.remove("hidden");

        }
      });
    });
 });


/////////////////////////////////////////////////////////
// ref.once("value").then(function(snapshot) {
//    snapshot.forEach(function(childSnapshot) {
//      console.log(childData);
//      var childData = childSnapshot.val();
//      // console.log(childData);
//      // var year = Object.keys(childData);
//      // var month = Object.keys(childData[year]);
//      // var day = Object.keys(childData[year][month]);
//
//      var tt = childData["'" + yearX + "'"];
//      console.log(tt);
//
//      // var distance_object = childData[year][month][day]['Distance'];
//      // var distance_array = Object.keys(distance_object).map(function(key) {
//      //   return [String(key), distance_object[key]];
//      // });
//      //
//      //
//      // var temperature_object = childData[year][month][day]['Temperature'];
//      // var temperature_array = Object.keys(temperature_object).map(function(key) {
//      //   return [String(key), temperature_object[key]];
//      // });
//      //
//      // var humidity_object = childData[year][month][day]['Humidity'];
//      // var humidity_array = Object.keys(humidity_object).map(function(key) {
//      //   return [String(key), humidity_object[key]];
//      // });
//      //
//      //
//      // // itterate through distance_array
//      // for(var d in distance_array){
//      //   dist_time.push(distance_array[d][0]); // use 0 to get time, use 1 to get value
//      //   dist_values.push(distance_array[d][1]); // use 0 to get time, use 1 to get value
//      // };
//      //
//      //
//      // // itterate through distance_array
//      // for(var t in temperature_array){
//      //   temp_time.push(temperature_array[t][0]); // use 0 to get time, use 1 to get value
//      //   temp_values.push(temperature_array[t][1]); // use 0 to get time, use 1 to get value
//      // };
//      //
//      // // itterate through distance_array
//      // for(var h in humidity_array){
//      //   hum_time.push(humidity_array[h][0]); // use 0 to get time, use 1 to get value
//      //   hum_values.push(humidity_array[h][1]); // use 0 to get time, use 1 to get value
//      // };
//      //
//      // var options = {
//      //   legend: { display: true },
//      //   title: {
//      //     display: true,
//      //     text: 'ARDUINO DATA'
//      //   },
//      //   scales: {
//      //       yAxes: [{
//      //           ticks: {
//      //               beginAtZero:true
//      //           }
//      //       }]
//      //   }
//      // }
//      //
//      // var myBarChart1 = new Chart(ctx_dist, {
//      //     type: 'bar',
//      //     data: {
//      //       labels: dist_time,
//      //       datasets: [{
//      //         label: "Distância (cm)",
//      //         data: dist_values,
//      //         backgroundColor: "rgb(57, 57, 57)"
//      //       }]
//      //     },
//      //     options: options
//      // });
//      //
//      // var myBarChart2 = new Chart(ctx_temp, {
//      //     type: 'bar',
//      //     data: {
//      //       labels: temp_time,
//      //       datasets: [{
//      //         label: "Temperatura (cm)",
//      //         data: temp_values,
//      //         backgroundColor: "#00ffc9"
//      //       }]
//      //     },
//      //     options: options
//      // });
//      //
//      // var myBarChart3 = new Chart(ctx_hum, {
//      //     type: 'bar',
//      //     data: {
//      //       labels: hum_time,
//      //       datasets: [{
//      //         label: "Humidade Relativa (%)",
//      //         data: hum_values,
//      //         backgroundColor: "#f44a6e"
//      //       }]
//      //     },
//      //     options: options
//      // });
//      //
//      // loading1.classList.add("hidden");
//      // loading2.classList.add("hidden");
//      // loading3.classList.add("hidden");
//      //
//      // ctx_temp.classList.remove("hidden");
//      // ctx_dist.classList.remove("hidden");
//      // ctx_hum.classList.remove("hidden");
//
//         ////////////////////////////
//      // console.log("year: " + year);
//      // console.log("month: " + month);
//      // console.log("day: " + day);
//      // console.log(sensors);
//      // console.log(distance_object);
//      // console.log(temperature_object);
//      // console.log(humidity_object);
//      // console.log("LETS CHANGE", "LETS CHANGE");
//      // console.log(distance_array);
//      // console.log(temperature_array);
//      // console.log(humidity_array);
//
//
//      // console.log("time: " + time);
//
//
//    });
//  });
// }

$( "#login" ).click(function() {
    // Get whats writen in the email and pass Inputs
    var email = emailInput.value;
    var pass = passwordInput.value;

    if(email|pass === ""){
      // iziToast.show({
      //   message: "<i class='text cursor icon'></i> Todos campos devem ser preenchidos."
      // });
      alert("Por favor preencha todos os espaços em branco adequadamente.")
    } else if (loginBtn.innerHTML == "Get Started!") {
      location.reload();

    } else {
      loginBtn.setAttribute("disabled", "");
      loginBtn.innerHTML="...";
      // Authenticate the user
      var promise = firebase.auth().signInWithEmailAndPassword(email, pass);
      // If error occors, log it.
      promise.catch(function(e){
        console.log(e);
        // If invalid email
        if(e.code === "auth/invalid-email"){
          loginBtn.removeAttribute("disabled", "");
          loginBtn.innerHTML="login";
          alert("Email invalido.");

        // If invalid Password
        }else if(e.code === "auth/wrong-password"){
          loginBtn.removeAttribute("disabled", "");
          loginBtn.innerHTML="login";
          alert("Password errado.");

        // If invalid user or User not registered
        } else if (e.code === "auth/user-not-found") {
          loginBtn.removeAttribute("disabled", "");
          alert("Usuário não registado. Contacte @kishannareshpal para registar-lhe.");
          loginBtn.innerHTML="login";

        }
      });
    }
  });



  //RealTime login/logout listener
  firebase.auth().onAuthStateChanged(function(firebaseUser){
     if(firebaseUser){
       //If the user is logged in do this
       //Save a cookie
       document.cookie = "signedin=yes; expires=Thu, 18 Dec 2019 12:00:00 UTC; path=/";
       loginBtn.removeAttribute("disabled", "");
       emailInput.setAttribute("disabled", "");
       passInput.setAttribute("disabled", "");

       loginBtn.classList.add("mdl-button--raised");
       loginBtn.innerHTML="Get Started!"

     } else {
       //If the user is NOT logged in do this
       document.cookie = "signedin=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
     }
   });


   $( "#logout" ).click(function() {
      if(confirm( "Deseja sair da conta?" )){
        firebase.auth().signOut();
        document.cookie = "signedin=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        window.location.reload(1);
      }else {
        return null;
      }
    });
