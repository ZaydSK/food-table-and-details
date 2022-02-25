<?php

    // Headers
    header('Access-Control-Allow-Origin: *');
    header('Content-Type: application/json');
    header('Access-Control-Allow-Methods: DELETE');

    include '../../config/Database.php';
    include '../../models/Category.php';

    // Launch DB connection
    $db = new Database();
    $db=$db->getConnection();

    // Create category object
    $category = new Category($db);
    $category->addCascade();
    // getting the data that was sent
   $data = json_decode(file_get_contents("php://input"));

   // if the provided data is not suitable send 400 bad request and error message
   if(!isset($data->id) || $data->id<0){
    http_response_code(400);
    echo (json_encode(["message"=>"Bad Request"]));
    return;
   }
   // otherwise call the adding function 
    $result =$category->delete($data->id);

    // if everything went right send successful message
   if($result){
    echo (json_encode(["message"=>"Category Deleted Successfully"]));
    return;
   } else {
       // otherwise change the status code and send error message
    http_response_code(404);
    echo (json_encode(["message"=>"Category ID was not found"]));
    return;
   }