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
    
    // arr is holding the page number then the search value
    // template: example.php/arr[0]/arr[1]
    $data = substr($_SERVER['PATH_INFO'],1);
    $arr= explode('/',$data);
    
    // calling the function with the page number abd activating the search
    $result = $food->getAll($arr[0],0,1,$arr[1]);
    
        
    
   
    //get the food list
   
    $foodList = array();
    while($row = $result->fetch(PDO::FETCH_ASSOC)){
        extract($row);
        $singleFood = array(
            'Code'=>$ndb_no,
            'Description'=>$long_desc,
        );
        array_push($foodList,$singleFood);
    }

    echo json_encode($foodList);