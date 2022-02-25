<?php

    class Food{
        // DB info
        private $connection;
        private $table = 'food_des';

        // Setting the connection
        public function __construct($db)
        {
            $this->connection = $db;
        }

        // Get All food
        /**
         * @param $page the page to be displayed
         * @param $sort tells if sort is activated
         * @param $search tells if search is activated
         * @param $searchValue the value to search according to it
         */
        public function getAll($page,bool $sort,bool $search,$searchValue){
            // the offset according to page number
            $offset = ($page - 1)*20;

            //if sorting is activated update the query
            $sortQuery="";
            if($sort){
                $sortQuery = "ORDER BY long_desc";
            }
             //if searching is activated update the query 
             // this search is insensitive
            $searchQuery="";
            if($search){
                $searchQuery = "WHERE LOWER(long_desc) LIKE LOWER('%$searchValue%')";
            }

            // Writing the SQL query
            $query = "SELECT  ndb_no, long_desc FROM $this->table $searchQuery $sortQuery LIMIT 20 OFFSET $offset";
            // Prepare query
            $statement = $this->connection->prepare($query);

            //Execute the query
            $statement->execute(); 

            return $statement;  

        }

        
       
        public function getSingle($id){
            try{
                $query ="SELECT
                long_desc,
                nutrdesc,
                nutr_val
            FROM
                nut_data nd
            JOIN nutr_def USING (nutr_no)
            JOIN ".$this->table." fd ON fd.ndb_no = '".$id."' 
            WHERE
                nd.ndb_no = '".$id."'";
            $statement = $this->connection->prepare($query);

            $statement->execute();
            } catch(Exception){
                throw new Exception('Wrong ID');
            }
            return $statement;
        }
            

    }