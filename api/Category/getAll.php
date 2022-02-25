<?php

    // Headers
    header('Access-Control-Allow-Origin: *');
    header('Content-Type: application/json');

    include '../../config/Database.php';
    include '../../models/Category.php';

    // Launch DB connection
    $db = new Database();
    $db=$db->getConnection();

    // Create category object
    $category = new Category($db);
    
    // calling the function from the model
    $list =$category->getAll();

    //get the category list
    $categoryList = array();
    while($row = $list->fetch(PDO::FETCH_ASSOC)){
        extract($row);
        $singleCategory = array(
            'id'=>$fdgrp_cd,
            'Name'=>$fddrp_desc,
        );
        array_push($categoryList,$singleCategory);
    }

    echo json_encode($categoryList);