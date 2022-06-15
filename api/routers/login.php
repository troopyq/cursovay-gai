<?php


// Роутер
function route($method, $urlData, $formData) {
  // response(200, ["ip" => $_SERVER['REMOTE_ADDR']]);
  // POST /query
  require_once './connect_db.php';
  require_once './functions/response.php';
  if ($method === 'POST' && empty($urlData)) {

    // require_once './functions/response.php';
    
    $POST = json_decode(file_get_contents('php://input'), TRUE) ?? $_POST;
    
    if (isset($POST)) {

      $login = trim(htmlspecialchars($POST['login']));
      $password = trim(htmlspecialchars($POST['password']));

      $errors = [
        "code" => 422,
        "message" => "хз что за ошибка",
        "status" => false
      ];

      if ($login !== '' && $password !== '') {
        
        //добавляем в базу нового юзера
        $check = mysqli_query(
          $db,
          "SELECT * FROM `users` WHERE `login` = '$login' AND `password` = '$password'"
        );
        if (mysqli_num_rows($check) > 0){
          $data = mysqli_fetch_all($check, MYSQLI_ASSOC);
          $res = [
            "status" => true,
            "token" => $data[0]["token"]
          ];

          response(200, $res);
        } else {
          $errors["message"] = "Неверный пароль";
          response(200, $errors);
        }

        exit();
        

      }
    } else {
      $errors = [
        "code" => 422,
        "message" => "Пустые поля в запросе",
        "status" => false
      ];

      response(200, $errors);
      exit();
    }

    return;
  }

  if($method === 'GET'){
    $POST = json_decode(file_get_contents('php://input'), TRUE) ?? $_POST;

    $token = $_GET['token'];
    if ($token) {
      $check = mysqli_query(
        $db,
        "SELECT * FROM `users` WHERE `token` = '$token'"
      );
      if (mysqli_num_rows($check) > 0){
        $data = mysqli_fetch_all($check, MYSQLI_ASSOC);
        $res = [
          "status" => true,
          "token" => $data[0]["token"]
        ];

        response(200, $res);
      } else {
        response(200, ["status" => false, "message" => "неверный токен"]);
      }

      exit();
    } else {
      response(200, ["status" => false, "message" => "токен не указан"]);
    }

    return;
  }
  $errors = [
    "code" => 422,
    "message" => "Ошибка метода",
    "status" => false
  ];
  // Возвращаем ошибку
  response(200, $errors);
}





