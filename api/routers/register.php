<?php


// Роутер
function route($method, $urlData, $formData) {
  
  $errors = [
    "status" => false,
    "message" => "Ошибка нс стороне сервера",
    "code" => 400,
  ];
  require_once './functions/response.php';

  // POST /register
  if ($method === 'POST' && empty($urlData)) {

    require_once './connect_db.php';
    
    
    $POST = json_decode(file_get_contents('php://input'), TRUE) ?? $_POST;
    

    
    if (isset($POST)) {

      $first_name = trim(htmlspecialchars($POST['first_name'])) ?? '';
      $last_name = trim(htmlspecialchars($POST['last_name'])) ?? '';
      $middle_name = trim(htmlspecialchars($POST['middle_name'])) ?? '';
      $email = trim(htmlspecialchars($POST['email'])) ?? '';
      $phone = trim(htmlspecialchars($POST['phone'])) ?? '';
      $password = trim(htmlspecialchars($POST['password'])) ?? '';

      // setcookie('test', $phone, time() + 4323042);
      
      if ($first_name !== '' && $last_name !== '' && $middle_name !== '' && $password !== '' && $email !== '' && $phone !== '') {
        
        $check_users = mysqli_query($db, "SELECT * FROM `users` WHERE `phone` = '$phone' OR `email` = '$email'");
        // если пользователь существует
        if (mysqli_num_rows($check_users) > 0) {
          $errors["message"] = "Такой пользователь существует";
          response(400, $errors);
          exit();
        }
        
        $date = date("Y-m-d H:i:s"); 
        $password = password_hash($password, PASSWORD_DEFAULT);
        $token = md5($phone . $password);
        
        //добавляем в базу нового юзера
        $res = mysqli_query(
          $db,
          "INSERT INTO `users` (`firstName`, `lastName`, `middleName`, `phone`, `email`, `password`, `token`, `date`) VALUES ('$first_name', '$last_name', '$middle_name', '$phone', '$email', '$password', '$token', '$date')"
        );

        //отдаем, что успешно зарегали
        if($res) {
          response(200, $token);
        } else{
          response(400, $res);
        }

      } else {
        $errors["message"] = "Не все поля заполнены";
  
        response(400, $errors);
        exit();
      }
    } else {
      $errors["message"] = "Не все поля заполнены";

      response(400, $errors);
      exit();
    }

    return;
  }
  $errors["message"] = "Ошибка в запросе или на стороне сервера";
  // Возвращаем ошибку
  response(400, $errors);
  exit();
}





