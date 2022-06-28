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
  // POST /query
  if ($method === 'POST' && empty($urlData)) {

    // require_once './functions/response.php';
    
    $POST = json_decode(file_get_contents('php://input'), TRUE) ?? $_POST;
    
    if (isset($POST)) {

      $POST = array_map('processFields', $POST);
      $login = $POST['login'];
      $password = $POST['password'];

      if ($email !== '' && $password !== '') {
        
        //добавляем в базу нового юзера
        $check = mysqli_query(
          $db,
          "SELECT * FROM `admins` WHERE `login` = '$login'"
        );
        if (mysqli_num_rows($check) > 0){
          // $user = mysqli_fetch_all($check, MYSQLI_ASSOC);
          $user = mysqli_fetch_assoc($check);
          if ($password != $user['password']){
            $errors["code"] = 401;
            $errors["message"] = "Логин или пароль неверны";

            response(401, $errors);
            exit();
          }

          response(200, $user["token"]);
        } else {
          $errors["code"] = 401;
          $errors["message"] = "Пользователь не найден";
          response(401, $errors);
        }

        exit();

      }
    } else {
      $errors = [
        "code" => 400,
        "message" => "Пустые поля в запросе",
        "status" => false,
      ];

      response(400, $errors);
      exit();
    }

    return;
  }

  if($method === 'GET'){
    $headers = getallheaders()['Authorization'] ?? getallheaders()['authorization']; // получаем контент авторизации
    $token = explode(' ', $headers)[1] ?? $_GET['token']; //получаем сам токен
    if ($token) {
      $check = mysqli_query(
        $db,
        "SELECT * FROM `admins` WHERE `token` = '$token'"
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
    "status" => false,
  ];
  // Возвращаем ошибку
  response(400, $errors);
}





