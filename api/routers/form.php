<?php


// Роутер
function route($method, $urlData, $formData) {
  $errors = [
    "status" => false,
    "message" => "Ошибка на стороне сервера",
    "code" => 400,
  ];
  require_once './connect_db.php';
  require_once './functions/response.php';
  // POST /query
  if ($method === 'POST' && empty($urlData)) {

    // require_once './functions/response.php';
    
    $POST = json_decode(file_get_contents('php://input'), TRUE) ?? $_POST;
    
    if (isset($POST)) {  
      // $POST = array_map('processFields', $POST);
      $userId = $POST["userId"];
      $form = json_encode($POST["form"], JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
      $date = date("Y-m-d H:i:s");

      $res = mysqli_query(
        $db,
        "INSERT INTO `forms` (`userId`, `form`, `date`) VALUES ('$userId', '$form', '$date')"
      );

      if($res) {
        response(200);
      } else{
        $errors["message"] = "Ошибка отправки заявки на стороне сервера";
        response(400, $errors);
      }
      exit();

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
    $userId = $_GET['userId'];

    $check = mysqli_query(
      $db,
      "SELECT * FROM `forms` WHERE `userId` = '$userId'"
    );
    if (mysqli_num_rows($check) > 0){
      $data = mysqli_fetch_all($check, MYSQLI_ASSOC);
      $res = [
        "status" => true,
        "data" => $data,
      ];

      response(200, $res);
    } else {
      response(400, ["status" => false, "message" => "Нет последних заявок", "data" => []]);
    }

    exit();


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





