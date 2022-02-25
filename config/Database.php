<?php

    class Database {
        // DB parameters 
        // to be changed according to your information
        private $host = 'localhost';
        private $username = 'postgres';
        private $password = '24820011';
        private $dbname ='testdb';
        private $connection;

        

        // Trying to connect to DB
        Public function __construct()
        {
            $this->connection = null;
            $dsn = 'pgsql:host='.$this->host. ';dbname='.$this->dbname.';';
            try{
                $this->connection = new PDO($dsn , $this->username,$this->password);
                $this->connection->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);
            } catch(PDOException $e){
                print_r(['message'=>'Connection to DB failed']);
                echo $e->getMessage();die();
            }

        }

        // Retrieve the connection param;
        public function getConnection(){
            return $this->connection;
        }
        
    }