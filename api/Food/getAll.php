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
    
    // getting the page number and store it in a variable
    $data = substr($_SERVER['PATH_INFO'],1);
    $arr= explode('/',$data);

    // calling the function with the page number and preventing sorting and searching
    $list =$food->getAll($arr[0],false,false,"");
    

    //get the food list
   
    $foodList = array();
    while($row = $list->fetch(PDO::FETCH_ASSOC)){
        extract($row);
        $singleFood = array(
            'Code'=>$ndb_no,
            'Description'=>$long_desc,
        );
        array_push($foodList,$singleFood);
    }
    // if there is no element left to view in that page send an error
    if(count($foodList)==0){
        echo json_encode(["message"=>"Not found"]);
    }

    
    echo json_encode($foodList);