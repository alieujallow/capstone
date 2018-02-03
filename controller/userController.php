<?php
 header("Content-Type: application/json");
//requires the user class
require('../model/user.php');
//gets the request method
$requestMethod = $_SERVER["REQUEST_METHOD"];

if ($requestMethod=="GET") 
{
    //returns all the users from the database
    if (isset($_GET['action']) & !empty($_GET['action']))
    {
        $sql="SELECT *FROM users;";

        //creates an object of the user class
        $user = new User;

        $result = $user->getUsers($sql);

        if ($result) 
        {
            echo json_encode($result);
        }
    } 
}
elseif ($requestMethod=="POST")
{
    //adds a user to the database
   if (isset($_POST['action']) & !empty($_POST['action']))
   {
        //gets the values
        $username= strip_tags($_POST['username']);
        $email= strip_tags($_POST['email']);
        $role= strip_tags($_POST['role']);

        //default password is 123
        $password = "123";

        //encrypts the password
        $hashedPassword = password_hash( $password,PASSWORD_DEFAULT);

        //sets the sql statement
        $sql = "INSERT INTO users(username,email,role,status,password) VALUES('$username','$email','2','pending','$hashedPassword');";

        //creates an object of the user class
        $user = new User;

        $result = $user->addUser($sql);

        if ($result)
        {
            echo json_encode($result);
        }
    }
}    
?>