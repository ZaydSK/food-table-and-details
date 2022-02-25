<?php

    // Headers
    header('Access-Control-Allow-Origin: *');
    header('Content-Type: application/json');

    include '../../config/Database.php';
    include '../../models/Food.php';

    // Launch DB connection
    $db = new Database();
    $db=$db->getConnection();

    // Create Food object
    $food = new Food($db);
    
    // get the id of the required element
    $id = $_GET['id'];
    //get the food list
    $list = $food->getSingle($id);
    
    $foodDetails = array();
    while($row = $list->fetch(PDO::FETCH_ASSOC)){
        extract($row);
        $singleComponent = array(
            'Name'=>$long_desc,
            'Component'=>$nutrdesc,
            'Amount'=>$nutr_val,
        );
        array_push($foodDetails,$singleComponent);
    }
    // if the provided id is not valid send 404
    if(!sizeof($foodDetails)){
        http_response_code(404);
        echo json_encode(['message'=>404]);
    }

    echo json_encode($foodDetails);