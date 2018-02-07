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
        $action=$_POST['action'];

        if ($action=="login") 
        {
            //gets the login credentials
            $username= strip_tags($_POST['username']);
            $password = strip_tags($_POST['password']);

            //creates a user object
            $user = new User;

            //sets the sql
            $sql = "SELECT user_id, username, password, role FROM users WHERE username='$username';";
            $result = $user->loginUser($sql);

            if ($result)
            {
                $row=$result[0];
                if ($row["username"]=="")
                {
                    //wrong username
                    echo loginResponse("fail",null,null,null,"wrong username");
                }
                else
                {
                    //verifies the password
                    if (password_verify($password, $row['password'])) 
                    {
                        //password is correct
                        //creating sessions
                        session_start();
                        $_SESSION['user_id'] = $row['user_id'];
                        $_SESSION['username'] = $row['username'];
                        $_SESSION['role'] = $row['role'];

                        echo loginResponse("success",$row['username'],$row['role'],$row['user_id'],"correct credentials");
                    }
                    else
                    {
                        //wrong password
                        echo loginResponse("fail",null,null,null,"wrong password");
                    }
                }
            }
            
        }
        //checks if a user is logged in
        elseif ($action=="checklogin") 
        {
            $response=array();

            session_start();
            if(isset($_SESSION['username']) && !empty($_SESSION['username'])) 
            {
                $response["status"]="success";
                $response["username"]=$_SESSION['username'];
            }
            else
            {
                $response["status"]="fail";
            }
            echo json_encode($response);
        }
        //logs out the user by destroying all the sessions
        elseif ($action=="logout") 
        {
            $response=array();
            session_start();
            session_unset(); 
            session_destroy(); 

            $response["status"]="success";
            echo json_encode($response);
        }
        elseif ($action=="addUser")
        {
            //gets the values
            $username= strip_tags($_POST['username']);
            $email= strip_tags($_POST['email']);
            $role= strip_tags($_POST['role']);

            //default password is 123
            $password = "123";

            //encrypts the password
            $hashedPassword = password_hash($password,PASSWORD_DEFAULT);

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
}

//login response
function loginResponse($status,$username,$role,$user_id,$message)
{
    $response = array();
    $response["status"] = $status;
    $response["user_id"] = $user_id;
    $response["username"] = $username;
    $response["role"] = $role;
    $response["message"] = $message;
    return json_encode($response);
}
?>