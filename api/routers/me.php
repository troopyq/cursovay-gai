<?php


// Роутер
function route($method, $urlData, $formData) {
  $errors = [
    "status" => false,
    "message" => "Ошибка нс стороне сервера",
    "code" => 400,
  ];
  require_once './connect_db.php';
  require_once './functions/response.php';

  if($method === 'GET'){
    $POST = json_decode(file_get_contents('php://input'), TRUE) ?? $_POST;
    $token = $_GET['token'];
    $headers = getallheaders()['Authorization'] ?? getallheaders()['authorization']; // получаем контент авторизации
    $token = explode(' ', $headers)[1] ?? $_GET['token']; //получаем сам токен
    if ($token) {
      $check = mysqli_query(
        $db,
        "SELECT * FROM `users` WHERE `token` = '$token'"
      );
      if (mysqli_num_rows($check) > 0){
        $user = mysqli_fetch_assoc($check);
        unset($user["password"]);


        response(200, $user);
      } else {
        response(401, ["status" => false, "message" => "неверный токен"]);
      }

      exit();
    } else {
      response(400, ["status" => false, "message" => "токен не указан"]);
    }

    return;
  }

  $errors = [
    "code" => 400,
    "message" => "Ошибка метода",
    "status" => false
  ];
  // Возвращаем ошибку
  response(400, $errors);
}





