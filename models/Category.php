<?php

    class Category{
        // DB Info
        private $connection;
        private $table = 'fd_group';
        private $cascade = false;
        
        // Setting the connection
        public function __construct($db)
        {
            $this->connection = $db;
        }

        public function getAll(){
            // write, prepare and execute the query 
            $query = "SELECT * FROM $this->table";
             
            $statement = $this->connection->prepare($query);

            $statement->execute();
            return $statement;
        }


        public function add($name){
            // getting the last element id and increment it by 100 to get the new element's id
            $query= $this->connection->prepare("SELECT * FROM $this->table ORDER BY fdgrp_cd DESC LIMIT 1");
            $query->execute();
            $id=0;
            while($row = $query->fetch(PDO::FETCH_ASSOC)){
                extract($row);
                $id= $row['fdgrp_cd'];
            } 
            $id+=100;

            // adding new element
            $query = $this->connection
                     ->prepare("INSERT INTO $this->table(fdgrp_cd,fddrp_desc) VALUES($id,'$name')");

            // return true or false according to the query result
            if($query->execute()){
            return true;}
            else{
                
                return false;
            }

        }

        public function delete($id){
            $query=$this->connection
                ->prepare("DELETE FROM $this->table WHERE fdgrp_cd = '$id'");
            
            // return true or false according to the query result
            if($query->execute()){
                return true;
            } return false;
        }

        // this function drops the required constrains and readd them with cascade property
        public function addCascade(){
            // Template
            /* ALTER TABLE "Children"
            DROP CONSTRAINT "Children_parentId_fkey",
            ADD CONSTRAINT "Children_parentId_fkey"
            FOREIGN KEY ("parentId")
            REFERENCES "Parent"(id)
            ON DELETE CASCADE; */

            // to do the work just one time
            if($this->cascade == true){
                return;
            }

            // fd_group <-> food_des
            $query = $this->connection->prepare("ALTER TABLE food_des 
            DROP CONSTRAINT food_des_fdgrp_cd_fkey,
            ADD CONSTRAINT food_des_fdgrp_cd_fkey
            FOREIGN KEY (fdgrp_cd)
            REFERENCES fd_group(fdgrp_cd)
            ON DELETE CASCADE;");
            $query->execute();

            // food_des <-> nut_data
            $query = $this->connection->prepare("ALTER TABLE nut_data
            DROP CONSTRAINT nut_data_ndb_no_fkey,
            ADD CONSTRAINT nut_data_ndb_no_fkey
            FOREIGN KEY (ndb_no)
            REFERENCES food_des(ndb_no)
            ON DELETE CASCADE;");
            $query->execute();

            // nut_data <-> datsrcln
            $query=$this->connection->prepare("ALTER TABLE datsrcln
            DROP CONSTRAINT IF EXISTS datsrcln_ndb_no_fkey , 
            DROP CONSTRAINT IF EXISTS datsrcln_nutr_no_fkey,
            ADD CONSTRAINT datsrcln_ndb_no_fkey -- datsrcln_nutr_no_fkey
            FOREIGN KEY (ndb_no , nutr_no)
            REFERENCES nut_data(ndb_no , nutr_no)
        	ON DELETE CASCADE;");
            $query->execute();


            // food_des <-> weight
            $query=$this->connection->prepare("ALTER TABLE weight
            DROP CONSTRAINT IF EXISTS weight_ndb_no_fkey,
            ADD CONSTRAINT weight_ndb_no_fkey
            FOREIGN KEY (ndb_no)
            REFERENCES food_des(ndb_no)
            ON DELETE CASCADE;");
            $query->execute();

            // food_des <-> footnote
            $query=$this->connection->prepare("ALTER TABLE footnote
            DROP CONSTRAINT IF EXISTS footnote_ndb_no_fkey,
            ADD CONSTRAINT footnote_ndb_no_fkey
            FOREIGN KEY (ndb_no)
            REFERENCES food_des(ndb_no)
            ON DELETE CASCADE;");
            $query->execute();

            // once it's done no need to do it again 
            $this->cascade=true;
             
        }
    }

    