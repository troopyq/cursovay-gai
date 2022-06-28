<?php 
// ответить клиенту
function response($code = 200, $response = null){
  http_response_code($code);
  if (isset($response)){
    // JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_NUMERIC_CHECK
    $res = json_encode($response, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    echo $res;
  }
}
//проверяет на наличие записей в бд
//получаем запрос от mysqli и возвращаем массив, где первый элемент это данные запроса
function isAvialable($response){
  if (mysqli_num_rows($response) > 0) {
    $res = mysqli_fetch_all($response, MYSQLI_ASSOC);
    
    return [$res, true];
  } else {
    return [[], false];
  }
}

/** 
 * Get header Authorization
 * */
function getAuthorizationHeader(){
  $headers = null;
  if (isset($_SERVER['Authorization'])) {
      $headers = trim($_SERVER["Authorization"]);
  }
  else if (isset($_SERVER['HTTP_AUTHORIZATION'])) { //Nginx or fast CGI
      $headers = trim($_SERVER["HTTP_AUTHORIZATION"]);
  } elseif (function_exists('apache_request_headers')) {
      $requestHeaders = apache_request_headers();
      // Server-side fix for bug in old Android versions (a nice side-effect of this fix means we don't care about capitalization for Authorization)
      $requestHeaders = array_combine(array_map('ucwords', array_keys($requestHeaders)), array_values($requestHeaders));
      //print_r($requestHeaders);
      if (isset($requestHeaders['Authorization'])) {
          $headers = trim($requestHeaders['Authorization']);
      }
  }
  return $headers;
}

/**
* get access token from header
* */
function getBearerToken() {
  $headers = getAuthorizationHeader();
  // HEADER: Get the access token from the header
  if (!empty($headers)) {
      if (preg_match('/Bearer\s(\S+)/', $headers, $matches)) {
          return $matches[1];
      }
  }
  return null;
}

function checkAuth(){
  include_once '../connect_db.php';
  $db = db();
  $token = getBearerToken();
  if ($token) {
    $check = mysqli_query(
      $db,
      "SELECT * FROM `admin` WHERE `token` = '$token'"
    );
    if (mysqli_num_rows($check) > 0){
      return true;
    } else {
      response(401, ["status" => false, "message" => "неверный токен авторизации Bearer"]);
      exit();
    }

    
  } else {
    response(401, ["status" => false, "message" => "нет токена авторизации Bearer"]);
    exit();
  }
}

function processFields($val){
  return trim(htmlspecialchars($val));
}


