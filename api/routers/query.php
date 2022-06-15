<?php


// Роутер
function route($method, $urlData, $formData) {
  // response(200, ["ip" => $_SERVER['REMOTE_ADDR']]);
  // POST /query
  if ($method === 'POST' && empty($urlData)) {
    require_once './connect_db.php';
    require_once './functions/response.php';

    // require_once './functions/response.php';
    
    $POST = json_decode(file_get_contents('php://input'), TRUE) ?? $_POST;


    
    if (isset($POST) && checkAuth()) {

      $phone = trim(htmlspecialchars($POST['phone']));
      $name = trim(htmlspecialchars($POST['name']));
      $comment = trim(htmlspecialchars($POST['comment']));

      $order_id = rand(1000,9999);

      $errors = [
        "code" => 422,
        "message" => "хз что за ошибка",
        "status" => false
      ];

      if ($phone !== '' && $name !== '') {
        
        //добавляем в базу нового юзера
        mysqli_query(
          $db,
          "INSERT INTO `query` ( `phone`, `name`, `comment`, `order_id`)
        VALUES ('$phone', '$name', '$comment', '$order_id') "
        );

        $res = [
          "order" => strval($order_id),
          "status" => true
        ];
        //отдаем, что успешно зарегали
        response(200, $res);
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
  $errors = [
    "code" => 422,
    "message" => "Ошибка метода",
    "status" => false
  ];
  // Возвращаем ошибку
  response(200, $errors);
}





