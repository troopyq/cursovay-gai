<?php
// $name = array_key_exists("DB_NAME", $_ENV) ? $_ENV["DB_HOST"] : false;
// $user = array_key_exists("DB_USER", $_ENV) ? $_ENV["DB_NAME"] : false;
// $pass = array_key_exists("DB_PASS", $_ENV) ? $_ENV["DB_PASS"] : false;

// print_r(getenv('DB_NAME'));

// if($user && $name && $pass){
//   $db = mysqli_connect('localhost', $user, $pass, $name);
// } else {
//   $db = mysqli_connect('localhost', 'root', 'root', 'cursovay');
// }
$db = mysqli_connect('localhost', 'root', 'root', 'cursovay');


function db(){
  $name = array_key_exists("DB_NAME", $_ENV) ? $_ENV["DB_HOST"] : false;
  $user = array_key_exists("DB_USER", $_ENV) ? $_ENV["DB_NAME"] : false;
  $pass = array_key_exists("DB_PASS", $_ENV) ? $_ENV["DB_PASS"] : false;
  if($user && $name && $pass){
    $db = mysqli_connect('localhost', $user, $pass, $name);
  } else {
    $db = mysqli_connect('localhost', 'root', 'root', 'cursovay');
  }
  
  return $db;
}
