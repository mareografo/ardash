<?php
use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

require('../vendor/autoload.php');

$app = new \Slim\App;

  // init my function
  require_once('../app/api/putdata.php');

$app->run();
