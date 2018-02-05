<?php
$app->get('/api/sensor', function(){

    // init variables
    $temperature;
    $humidity;
    $distance;

    // setup firebase lib
    $firebase = new \Geckob\Firebase\Firebase('../web/mareografo-arduino-firebase-adminsdk-khv8t-5ca6e2f18a.json');

    // setup date and time so we can organize our server
      date_default_timezone_set("Africa/Maputo"); // set the locale to Mozambique/Maputo
      $year = date("Y");  // retrieve the current year
      $month = date("M"); // retrieves the current month as text, such as: "Feb"
      $day = date("d");   // retrieves the current year

      $hour = date("H");  // retrieves hour
      $minutes = date("i"); // retrieves minutes
      $second = date("s"); // retrieves seconds

      $time = "{$hour}h{$minutes}m {$second}s"; // Organize current time vars
      $firebase = $firebase->setPath("sensors/$year/$month/$day/"); // sets the default path on database

    // check if parameters exists
    if (isset($_GET['d'])) { // check if DISTANCE parameter was sent (sensor/?d=<value>)
      $distance = $_GET['d']; // retrieve the same parameter and store it in a var
      $firebase->set("Distance/$time", "$distance"); // send the variable as the correspondent sensor_type
      echo "dist!";
    }

    if (isset($_GET['h'])) { // check if HUMIDITY parameter was sent (sensor/?h=<value>)
      $humidity = $_GET['h']; // retrieve the same parameter and store it in a var
      $firebase->set("Humidity/$time", "$humidity"); // send the variable as the correspondent sensor_type
      echo "hum!";
    }

    if(isset($_GET['t'])){ // check if TEMPERATURE parameter was sent (sensor/?t=<value>)
      $temperature = $_GET['t']; // retrieve the same parameter and store it in a var
      $firebase->set("Temperature/$time", "$temperature"); // send the variable as the correspondent sensor_type
      echo "temp!";
    }
    echo "<br>200 OK";
}); //.app closed.
