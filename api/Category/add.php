<?php

    // Headers
    header('Access-Control-Allow-Origin: *');
    header('Content-Type: application/json');
    header('Access-Control-Allow-Methods: POST');

    //including the database and the model
    include '../../config/Database.php';
    include '../../models/Category.php';

    // Launch DB connection
    $db = new Database();
    $db=$db->getConnection();

    // Create category object
    $category = new Category($db);
    
    // get the data
    $data = json_decode(file_get_contents("php://input"));

    // if the provided data is not suitable send 400 bad request and error message
    if(!isset($data->name) || strlen($data->name)<1){
        http_response_code(400);
        echo (json_encode(["message"=>"Please Provide Category Name"]));
        return;
    }

    // otherwise call the adding function 
    $result =$category->add($data->name);

    // if everything went right send successful message
    if($result){
        $message=json_encode(["message"=>"Category added successfully","name"=>"$data->name"]);
        echo $message;
    } else {
        // otherwise change the status code and send error message
        http_response_code(404);
        $message=json_encode(["message"=>"Category couldn't be added"]);
        echo $message;
    }