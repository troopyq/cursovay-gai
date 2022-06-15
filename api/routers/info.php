<?php

// Роутер
function route($method, $urlData, $formData) {
  // response(200, ["ip" => $_SERVER['REMOTE_ADDR']]);
  // POST /query
  if ($method === 'GET') {
    require_once './connect_db.php';
    require_once './functions/response.php';

    // require_once './functions/response.php';
    
    $POST = json_decode(file_get_contents('php://input'), TRUE) ?? $_POST;
    
    $data_check = mysqli_query($db, 
    "SELECT * FROM `query`");

    // если нашлись, перебираем и отдаем их клиенту
    if (mysqli_num_rows($data_check) > 0){
      $data = mysqli_fetch_all($data_check, MYSQLI_ASSOC);

      print_r($data["phone"]);

      $response = [
        "status" => true,
        "data" => $data,
      ];
  
      // foreach ($airports as $key => $value) {
      //   $response["data"]["items"][$key] = $value;
      // }
      response(200, $response);

    } else {
      //если ничего не нашлось
      
      response(200, []);
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